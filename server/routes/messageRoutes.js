const express = require("express");
const MessageThread = require("../models/MessageThread");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// 1. GET ALL THREADS FOR LOGGED-IN USER (Works for both Buyers and Owners)
router.get("/my-threads", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find threads where the user is either the buyer or the owner
    const threads = await MessageThread.find({
      $or: [{ buyer: userId }, { owner: userId }]
    })
    .populate("property", "title images")
    .populate("buyer", "name email")
    .populate("owner", "name email")
    .sort({ updatedAt: -1 }); // Show most recently updated threads first

    res.json(threads);
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

    // Determine who is the buyer and who is the owner for the query
    // If the logged-in user is the owner, the receiver is the buyer, and vice versa.
    const isOwnerSending = req.user.role === "owner";
    const buyerId = isOwnerSending ? receiverId : senderId;
    const ownerId = isOwnerSending ? senderId : receiverId;

    // Check if a thread already exists for this exact buyer, owner, and property
    let thread = await MessageThread.findOne({
      property: propertyId,
      buyer: buyerId,
      owner: ownerId
    });

    // If no thread exists, create one
    if (!thread) {
      thread = new MessageThread({
        property: propertyId,
        buyer: buyerId,
        owner: ownerId,
        messages: []
      });
    }

    // Add the new message to the thread
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
        // If someone else sent the message and it hasn't been read
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