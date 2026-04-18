const express = require("express");
const MessageThread = require("../models/MessageThread");
// FIXED: Import path updated to single ../
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// 1. GET ALL THREADS FOR LOGGED-IN USER (Works for both Buyers and Owners)
router.get("/my-threads", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // FIXED: Removed populates and added .lean()
    const threads = await MessageThread.find({
      $or: [{ buyer: userId }, { owner: userId }]
    })
    .sort({ updatedAt: -1 })
    .lean(); 

    // STITCHING: Fetch data from Property (5002) and User (5001) services
    const populatedThreads = await Promise.all(
      threads.map(async (thread) => {
        
        // 1. Fetch Property Data
        if (thread.propertyDeleted) {
            // ⚡ FAST PATH: We already know it's deleted from RabbitMQ! Skip the network request!
            thread.property = { _id: thread.property, title: "[Deleted Property]", images: [], isDeleted: true };
        } else {
            // 🐢 NORMAL PATH: It's an active property, so fetch the details
            try {
                const propRes = await fetch(`${process.env.PROPERTY_SERVICE_URL}/api/properties/${thread.property}`);
                if (propRes.ok) {
                    const propData = await propRes.json();
                    thread.property = { 
                        _id: propData._id, 
                        title: propData.title, 
                        images: propData.images,
                        isDeleted: false ,
                        status: propData.status
                    };
                } else {
                    thread.property = { _id: thread.property, title: "[Deleted Property]", images: [], isDeleted: true };
                }
            } catch (e) { 
                thread.property = { _id: thread.property, title: "[Deleted Property]", images: [], isDeleted: true }; 
            }
        }

        // 2. Fetch Buyer Data
        try {
          const buyerRes = await fetch(`${process.env.USER_SERVICE_URL}/api/auth/user/${thread.buyer}`);
          if (buyerRes.ok) {
            const buyerData = await buyerRes.json();
            thread.buyer = { _id: buyerData._id, name: buyerData.name, email: buyerData.email };
          }
        } catch (e) { thread.buyer = { name: "Unknown User", email: "N/A" }; }

        // 3. Fetch Owner Data
        try {
          const ownerRes = await fetch(`${process.env.USER_SERVICE_URL}/api/auth/user/${thread.owner}`);
          if (ownerRes.ok) {
            const ownerData = await ownerRes.json();
            thread.owner = { _id: ownerData._id, name: ownerData.name, email: ownerData.email };
          }
        } catch (e) { thread.owner = { name: "Unknown Owner", email: "N/A" }; }

        return thread;
      })
    );

    res.json(populatedThreads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. SEND A MESSAGE (Create new thread or add to existing)
router.post("/send", authMiddleware, async (req, res) => {
  try {
    const { propertyId, receiverId, text } = req.body;
    const senderId = req.user.id;

    if (!propertyId || !receiverId || !text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // NEW: Verify the property still exists before allowing a message
    try {
      const propCheck = await fetch(`${process.env.PROPERTY_SERVICE_URL}/api/properties/${propertyId}`);
      if (!propCheck.ok) {
        return res.status(400).json({ message: "Cannot send message. This property has been deleted." });
      }
      const propData = await propCheck.json();
      if (propData.status === "sold") {
        return res.status(400).json({ message: "Cannot send message. This property has been sold." });
      }
    } catch (error) {
      return res.status(500).json({ message: "Failed to verify property status. Try again later." });
    }

    const isOwnerSending = req.user.role === "owner";
    const buyerId = isOwnerSending ? receiverId : senderId;
    const ownerId = isOwnerSending ? senderId : receiverId;

    let thread = await MessageThread.findOne({
      property: propertyId,
      buyer: buyerId,
      owner: ownerId
    });

    if (!thread) {
      thread = new MessageThread({
        property: propertyId,
        buyer: buyerId,
        owner: ownerId,
        messages: []
      });
    }

    thread.messages.push({
      sender: senderId,
      text: text
    });

    await thread.save();

    res.status(201).json({ message: "Message sent!", thread });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET unread message count
router.get("/unread", authMiddleware, async (req, res) => {
  try {
    const threads = await MessageThread.find({
      $or: [{ buyer: req.user.id }, { owner: req.user.id }]
    });

    let unreadCount = 0;
    threads.forEach(thread => {
      thread.messages.forEach(msg => {
        if (msg.sender.toString() !== req.user.id && !msg.read) {
          unreadCount++;
        }
      });
    });

    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// MARK thread as read
router.patch("/mark-read/:threadId", authMiddleware, async (req, res) => {
  try {
    const thread = await MessageThread.findById(req.params.threadId);
    if (!thread) return res.status(404).json({ message: "Thread not found" });

    let updated = false;
    thread.messages.forEach(msg => {
      if (msg.sender.toString() !== req.user.id && !msg.read) {
        msg.read = true;
        updated = true;
      }
    });

    if (updated) await thread.save();
    res.json({ message: "Thread marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;