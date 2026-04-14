// const express = require("express");
// const User = require("../models/User");
// const Property = require("../../property-service/models/Property");
// const authMiddleware = require("../../middleware/authMiddleware");
// const allowRoles = require("../../middleware/roleMiddleware");
// const router = express.Router();

// // get all users
// router.get("/users", authMiddleware, allowRoles("admin"), async (req, res) => {
//     try {
//         const users = await User.find().select("-password");
//         res.json(users);
//     }
//     catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// // block user
// router.patch("/block-user/:id", authMiddleware, allowRoles("admin"), async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({
//                 message: "User not found"
//             });
//         }
//         // prevent blocking other admins
//         if (user.role === "admin") {
//             return res.status(403).json({
//                 message: "Cannot block an admin user"
//             });
//         }
//         user.isBlocked = true;

//         await user.save();

//         res.json({
//             message: "User blocked successfully"
//         });
//     }
//     catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// // delete property (admin)
// router.delete("/delete-property/:id", authMiddleware, allowRoles("admin"), async (req, res) => {
//     try {
//         const property = await Property.findById(req.params.id);
//         if (!property) {
//             return res.status(404).json({
//                 message: "Property not found"
//             });
//         }

//         await property.deleteOne();

//         res.json({
//             message: "Property deleted by admin"
//         });
//     }
//     catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// module.exports = router;


const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

// 🛠️ THE FIX: Instead of trying to read a file from another service, 
// we just tell Mongoose to connect to the "properties" collection in your shared database.
const Property = mongoose.models.Property || mongoose.model("Property", new mongoose.Schema({}, { strict: false }));

// 🚨 FIXED PATHS: Assuming you copied the middleware folder into the user-service folder
const authMiddleware = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const router = express.Router();

// get all users
router.get("/users", authMiddleware, allowRoles("admin"), async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// block user
router.patch("/block-user/:id", authMiddleware, allowRoles("admin"), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // prevent blocking other admins
        if (user.role === "admin") {
            return res.status(403).json({ message: "Cannot block an admin user" });
        }
        user.isBlocked = true;
        await user.save();

        res.json({ message: "User blocked successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete property (admin)
router.delete("/delete-property/:id", authMiddleware, allowRoles("admin"), async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        await property.deleteOne();
        res.json({ message: "Property deleted by admin" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;