const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");
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

        const properties = await Property.find(dbQuery)
            .populate("owner", "name email");
            
        res.json(properties);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// get all properties

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email");
    res.json(properties);
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
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


router.get("/:id", async (req, res) => {

  try {
    const property = await Property.findById(req.params.id)
      .populate("owner", "name email");
    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.json(property);
  }
  catch (error) {
    res.status(500).json({
      message: error.message
    });
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
        res.json({
            message: "Property updated successfully",
            property
        });
    }
    catch (error) {
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
        
        res.json({
            message: "Property status updated",
            property
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;