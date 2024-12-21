const db = require("../database/db"); // Assuming your Sequelize models are in the ../models folder
const SubObligation = db.subObligation;

// Create a new SubObligation
exports.createSubObligation = async (req, res) => {
    try {
        const { title, description, interpretation, obligationId } = req.body;

        if (!title || !description || !obligationId) {
            return res.status(400).json({
                message: "Title, description, and obligationId are required.",
            });
        }

        const newSubObligation = await SubObligation.create({
            title,
            description,
            interpretation,
            obligationId,
        });

        res.status(201).json(newSubObligation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating SubObligation.", error: error.message });
    }
};

// Get SubObligation by ID
exports.getSubObligationById = async (req, res) => {
    try {
        const { subObligationId } = req.params;

        const subObligation = await SubObligation.findByPk(subObligationId);

        if (!subObligation) {
            return res.status(404).json({ message: "SubObligation not found." });
        }

        res.status(200).json(subObligation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching SubObligation.", error: error.message });
    }
};

// Get all SubObligations by Obligation ID
exports.getAllSubObligationsByObligationId = async (req, res) => {
    try {
        const { obligationId } = req.params;

        const subObligations = await SubObligation.findAll({
            where: { obligationId },
        });

        if (subObligations.length === 0) {
            return res.status(404).json({
                message: "No SubObligations found for the provided obligation ID.",
            });
        }

        res.status(200).json(subObligations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching SubObligations.", error: error.message });
    }
};

// Update SubObligation by ID
exports.updateSubObligationById = async (req, res) => {
    try {
        const { subObligationId } = req.params;
        const { title, description, interpretation } = req.body;

        const subObligation = await SubObligation.findByPk(subObligationId);

        if (!subObligation) {
            return res.status(404).json({ message: "SubObligation not found." });
        }

        subObligation.title = title ?? subObligation.title;
        subObligation.description = description ?? subObligation.description;
        subObligation.interpretation = interpretation ?? subObligation.interpretation;

        await subObligation.save();
        res.status(200).json({
            message: "SubObligation updated successfully.",
            subObligation,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating SubObligation.", error: error.message });
    }
};

// Delete SubObligation by ID
exports.deleteSubObligationById = async (req, res) => {
    try {
        const { subObligationId } = req.params;

        const subObligation = await SubObligation.findByPk(subObligationId);

        if (!subObligation) {
            return res.status(404).json({ message: "SubObligation not found." });
        }

        await subObligation.destroy();
        res.status(200).json({ message: "SubObligation deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting SubObligation.", error: error.message });
    }
};