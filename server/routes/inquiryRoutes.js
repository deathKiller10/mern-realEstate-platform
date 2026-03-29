const express = require("express");
const Inquiry = require("../models/Inquiry");
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
    const inquiries = await Inquiry.find({ owner: req.user.id })
      .populate("property", "title location") // Grab the property name so the owner knows what it's about
      .sort({ createdAt: -1 });
      
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;