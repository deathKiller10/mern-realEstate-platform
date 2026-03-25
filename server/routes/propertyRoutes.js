const express = require("express");
const Property = require("../models/Property");
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const router = express.Router();

// add property

router.post("/", authMiddleware, allowRoles("owner"), async (req, res) => {

    try {
        const { title, description, price, location, type, status, images } = req.body;
        if (!title || !description || !price || !location || !type) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const property = new Property({
            title,
            description,
            price,
            location,
            type,
            status: status || "available",
            images,
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
        const { query,location, type, minPrice, maxPrice } = req.query;
        const searchQuery = {};

        if (query) {
        searchQuery.$or = [
        { location: { $regex: query, $options: "i" } },
        { title: { $regex: query, $options: "i" } }
          ];
        }
        if (location) {
            query.location = { $regex: location, $options: "i" };
        }
        if (type) {
            query.type = type;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
                query.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                query.price.$lte = Number(maxPrice);
            }
        }
        const properties = await Property.find(query)
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