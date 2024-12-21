const db = require("../database/db");
const Obligation = db.obligation;

// Create a new Obligation
exports.createObligation = async (req, res) => {
    try {
        const { title, description, interpretation } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const newObligation = await Obligation.create({ title, description, interpretation });
        res.status(201).json(newObligation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating obligation.", error: error.message });
    }
};

// Get Obligation by ID
exports.getObligationById = async (req, res) => {
    try {
        const { obligationId } = req.params;

        const obligation = await Obligation.findByPk(obligationId);

        if (!obligation) {
            return res.status(404).json({ message: "Obligation not found." });
        }

        res.status(200).json(obligation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching obligation.", error: error.message });
    }
};

// Get all Obligations by Law ID
exports.getAllObligationsByLawId = async (req, res) => {
    try {
        const { lawId } = req.params;

        const obligations = await Obligation.findAll({ where: { lawId } });

        if (obligations.length === 0) {
            return res.status(404).json({ message: "No obligations found for the provided law ID." });
        }

        res.status(200).json(obligations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching obligations.", error: error.message });
    }
};

// Update Obligation by ID
exports.updateObligationById = async (req, res) => {
    try {
        const { obligationId } = req.params;
        const { title, description, interpretation } = req.body;

        const obligation = await Obligation.findByPk(obligationId);

        if (!obligation) {
            return res.status(404).json({ message: "Obligation not found." });
        }

        obligation.title = title ?? obligation.title;
        obligation.description = description ?? obligation.description;
        obligation.interpretation = interpretation ?? obligation.interpretation;

        await obligation.save();
        res.status(200).json({ message: "Obligation updated successfully.", obligation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating obligation.", error: error.message });
    }
};

// Delete Obligation by ID
exports.deleteObligationById = async (req, res) => {
    try {
        const { obligationId } = req.params;

        const obligation = await Obligation.findByPk(obligationId);

        if (!obligation) {
            return res.status(404).json({ message: "Obligation not found." });
        }

        await obligation.destroy();
        res.status(200).json({ message: "Obligation deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting obligation.", error: error.message });
    }
};