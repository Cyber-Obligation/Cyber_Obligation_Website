const db = require("../database/db");
const moment = require("moment")

// Get user by oauthProviderId
exports.getUserByOauthProviderId = async (req, res) => {
    try {
        const { oauthProviderId } = req.body;

        if (!oauthProviderId) {
            return res.status(400).json({ error: "oauthProviderId is required" });
        }

        const user = await db.user.findOne({
            where: { oauthProviderId }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by oauthProviderId:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Create user
exports.createUser = async (req, res) => {
    try {
        const { email, name, profilePicture, oauthProviderId } = req.body;

        if (!email || !name || !oauthProviderId) {
            return res.status(400).json({ error: "Email, name, and oauthProviderId are required" });
        }

        const user = await db.user.create({
            email,
            name,
            profilePicture,
            oauthProviderId,
        });

        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete user by ID
exports.removeUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const rowsDeleted = await db.user.destroy({
            where: { id: userId }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const [rowsUpdated] = await db.user.update(updates, {
            where: { id: userId }
        });

        if (rowsUpdated === 0) {
            return res.status(404).json({ error: "User not found or no changes made" });
        }

        const updatedUser = await db.user.findByPk(userId);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};