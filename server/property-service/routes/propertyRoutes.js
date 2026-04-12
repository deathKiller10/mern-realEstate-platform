const { publishEvent } = require("../config/rabbitmq");
const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
const redisClient = require("../config/redisClient");
const router = express.Router();

// add property
router.post("/", authMiddleware, allowRoles("owner"), upload.single("image"), async (req, res) => {
    try {
        const { title, description, price, location, type, bhk, area, status } = req.body;
        
        if (!title || !description || !price || !location || !type || !bhk || !area) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        // Check if an image was actually uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        // Format the path so it works nicely on the frontend
        const imagePath = `uploads/${req.file.filename}`;

        const property = new Property({
            title,
            description,
            price,
            location,
            type,
            bhk: Number(bhk),
            area: Number(area),
            status: status || "available",
            images: [imagePath], // Save the file path to MongoDB
            owner: req.user.id
        });
        
        await property.save();

        await redisClient.del("all_properties");
        console.log("🧹 Cache Cleared: New property added");
        
        res.status(201).json({
            message: "Property added successfully",
            property
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// search and filter properties
router.get("/search", async (req, res) => {
    try {
        // Alias 'query' to 'searchTerm' to prevent variable collisions
        const { query: searchTerm, location, type, minPrice, maxPrice } = req.query;
        
        // This is the actual object we will pass to MongoDB
        const dbQuery = {};

        if (searchTerm) {
            dbQuery.$or = [
                { location: { $regex: searchTerm, $options: "i" } },
                { title: { $regex: searchTerm, $options: "i" } }
            ];
        }

        if (location) {
            dbQuery.location = { $regex: location, $options: "i" };
        }

        if (type) {
            dbQuery.type = type;
        }

        if (minPrice || maxPrice) {
            dbQuery.price = {};
            if (minPrice) dbQuery.price.$gte = Number(minPrice);
            if (maxPrice) dbQuery.price.$lte = Number(maxPrice);
        }

        const properties = await Property.find(dbQuery);
            
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// get all properties (NOW WITH REDIS CACHING)
router.get("/", async (req, res) => {
  try {
    // 1. Check if we have the properties saved in Redis
    const cachedProperties = await redisClient.get("all_properties");

    if (cachedProperties) {
      console.log("⚡ Serving from Redis Cache");
      // Redis stores data as strings, so we parse it back to JSON
      return res.json(JSON.parse(cachedProperties)); 
    }

    console.log("🗄️ Serving from MongoDB (Cache Miss)");
    
    // 2. If not in Redis, fetch from MongoDB (Stitching User Data)
    const properties = await Property.find({ status: "available" }).lean().sort({ createdAt: -1 });

    const propertiesWithOwners = await Promise.all(
      properties.map(async (property) => {
        try {
          const userRes = await fetch(`http://localhost:5002/api/auth/user/${property.owner}`);
          if (userRes.ok) {
            const userData = await userRes.json();
            property.owner = userData; 
          }
        } catch (err) {
          property.owner = { name: "Unknown Owner", email: "N/A" }; 
        }
        return property;
      })
    );

    // 3. Save the result into Redis for the next person!
    // SETEX means "Set with Expiration". We'll cache it for 3600 seconds (1 hour).
    await redisClient.setEx("all_properties", 3600, JSON.stringify(propertiesWithOwners));

    res.json(propertiesWithOwners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Get full property details for the Wishlist
router.post("/wishlist-details", async (req, res) => {
  try {
    const { propertyIds } = req.body;
    
    if (!propertyIds || !Array.isArray(propertyIds)) {
      return res.status(400).json({ message: "Invalid property IDs" });
    }

    // Fetch all properties where the ID is inside the array
    const savedProperties = await Property.find({ _id: { $in: propertyIds } });
    
    res.json(savedProperties);
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    res.status(500).json({ message: "Server error fetching wishlist properties" });
  }
});

// get logged-in owner's properties
router.get("/my-properties", authMiddleware, allowRoles("owner"), async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.id }).sort({ createdAt: -1 });
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// 1. SECURED: Only logged-in users can book a property
router.patch("/book", authMiddleware, async (req, res) => {
    const { propertyId, buyerEmail } = req.body;
    try {
        const userCheck = await fetch(`http://localhost:5001/api/auth/user/${req.user.id}`);
        if (userCheck.ok) {
            const userData = await userCheck.json();
            if (userData.isBlocked) {
                return res.status(403).json({ message: "Action denied. Your account is currently suspended." });
            }
        }
        await Property.findByIdAndUpdate(propertyId, { $set: { status: "sold", buyer: buyerEmail } });
        if (redisClient) await redisClient.del("all_properties"); // Clear cache
        res.status(200).json({ message: "Success" });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
});

// 2. SECURED: Only logged-in users can view their bookings
router.get("/my-bookings", authMiddleware, async (req, res) => {
    try {
        // Find properties where the buyer email matches the requested email
        const bookings = await Property.find({ buyer: req.query.email });
        res.json(bookings);
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
});

// get single property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).lean();
    
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Fetch the owner data for this specific property
    try {
      const userRes = await fetch(`http://localhost:5001/api/auth/user/${property.owner}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        property.owner = userData;
      }
    } catch (err) {
      property.owner = { name: "Unknown Owner", email: "N/A" };
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update property
router.put("/:id", authMiddleware, allowRoles("owner"), async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }
        // check ownership
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to edit this property"
            });
        }
        const { title, description, price, location, type, images } = req.body;
        property.title = title || property.title;
        property.description = description || property.description;
        property.price = price || property.price;
        property.location = location || property.location;
        property.type = type || property.type;
        property.images = images || property.images;

        await property.save();

        await redisClient.del("all_properties");
        console.log("🧹 Cache Cleared: Property updated");

        res.json({
            message: "Property updated successfully",
            property
        });
    }
    catch (error) {
        if (error.name === 'VersionError') {
            return res.status(409).json({ 
                message: "Conflict: This property was just modified by another process. Please refresh and try again." 
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
});

// delete property
router.delete("/:id", authMiddleware, allowRoles("owner"), async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                message: "Property not found"
        });
        }
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not allowed to delete this property"
        });
        }

        await property.deleteOne();

        await redisClient.del("all_properties");
        console.log("🧹 Cache Cleared: Property deleted");

        publishEvent({
            action: "PROPERTY_DELETED",
            propertyId: req.params.id
        });

        res.json({
            message: "Property deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// update property status
router.patch("/:id/status", authMiddleware, allowRoles("owner"), async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                message: "Property not found"
            });
        }
        if (property.owner.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized"
            });
        }
        const { status } = req.body;
        property.status = status;
        
        await property.save();

        await redisClient.del("all_properties");
        
        res.json({
            message: "Property status updated",
            property
        });
    }
    catch (error) {
        if (error.name === 'VersionError') {
            return res.status(409).json({ 
                message: "Conflict: This property was just modified by another process. Please refresh and try again." 
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;