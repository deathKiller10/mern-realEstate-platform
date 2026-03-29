const express = require("express");
const Inquiry = require("../models/Inquiry");
// FIXED: Import paths updated to single ../
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const router = express.Router();

// 1. PUBLIC: Buyer sends an inquiry
router.post("/", async (req, res) => {
  try {
    const { propertyId, ownerId, buyerName, buyerEmail, buyerPhone, message } = req.body;

    if (!propertyId || !ownerId || !buyerName || !buyerEmail || !buyerPhone || !message) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    const inquiry = new Inquiry({
      property: propertyId,
      owner: ownerId,
      buyerName,
      buyerEmail,
      buyerPhone,
      message,
    });

    await inquiry.save();
    res.status(201).json({ message: "Inquiry sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. PROTECTED: Owner views their received inquiries
router.get("/my-inquiries", authMiddleware, allowRoles("owner"), async (req, res) => {
  try {
    // FIXED: Removed populate() and added .lean()
    const inquiries = await Inquiry.find({ owner: req.user.id })
      .sort({ createdAt: -1 })
      .lean();
      
    // STITCHING: Fetch property data from Property Service (Port 5002)
    const inquiriesWithProperties = await Promise.all(
      inquiries.map(async (inquiry) => {
        try {
          const propRes = await fetch(`http://localhost:5002/api/properties/${inquiry.property}`);
          if (propRes.ok) {
            const propData = await propRes.json();
            inquiry.property = { 
              _id: propData._id, 
              title: propData.title, 
              location: propData.location 
            };
          }
        } catch (err) {
          inquiry.property = { title: "Unknown Property", location: "N/A" };
        }
        return inquiry;
      })
    );

    res.json(inquiriesWithProperties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;