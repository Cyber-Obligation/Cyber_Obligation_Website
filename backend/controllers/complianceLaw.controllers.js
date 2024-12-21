// complianceLaw.controllers.js

const db = require("../database/db"); // Import the database instance
const businessCategory = db.businessCategory;// Access the businessCategory model
const ComplianceLaw = db.complianceLaw; // Access the ComplianceLaw model


module.exports = {
    // Create a new Compliance Law
    createComplianceLaw: async (req, res) => {
        try {
            const { title, description, dateEffective, isActive, regionCategory, interpretation } = req.body;

            if (!title || !description || !dateEffective || !regionCategory) {
                return res.status(400).json({ message: "Title, description, dateEffective, and regionCategory are required." });
            }

            const newLaw = await ComplianceLaw.create({
                title,
                description,
                dateEffective,
                isActive,
                regionCategory,
                interpretation,
            });

            res.status(201).json({ message: "Compliance law created successfully.", data: newLaw });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to create compliance law.", error: error.message });
        }
    },

    // Get Compliance Law by ID includes all the businessCategory instnaces associated
    // with it.
    getComplianceLawById: async (req, res) => {
        try {
            const { lawId } = req.params;

            const law = await ComplianceLaw.findByPk(lawId, {
                include: {
                    model: businessCategory,
                    through: {
                        attributes: [],
                    },
                },
            });

            if (!law) {
                return res.status(404).json({ message: "Compliance law not found." });
            }

            res.status(200).json({ data: law });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch compliance law.", error: error.message });
        }
    },

    // Get all Compliance Laws, doesn't include the businessCategory associated with them.
    getAllComplianceLaws: async (req, res) => {
        try {
            const laws = await ComplianceLaw.findAll();
            res.status(200).json({ data: laws });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch compliance laws.", error: error.message });
        }
    },

    // Update Compliance Law by ID
    updateComplianceLawById: async (req, res) => {
        try {
            const { lawId } = req.params;
            const { title, description, dateEffective, isActive, regionCategory, interpretation } = req.body;

            const [updatedRowCount] = await ComplianceLaw.update(
                { title, description, dateEffective, isActive, regionCategory, interpretation },
                { where: { id: lawId } }
            );

            if (updatedRowCount === 0) {
                return res.status(404).json({ message: "Compliance law not found or not updated." });
            }

            const updatedLaw = await ComplianceLaw.findByPk(lawId);
            res.status(200).json({ message: "Compliance law updated successfully.", data: updatedLaw });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update compliance law.", error: error.message });
        }
    },

    // Delete Compliance Law by ID
    deleteComplianceLawById: async (req, res) => {
        try {
            const { lawId } = req.params;

            const deletedRowCount = await ComplianceLaw.destroy({ where: { id: lawId } });
            if (deletedRowCount === 0) {
                return res.status(404).json({ message: "Compliance law not found or not deleted." });
            }

            res.status(200).json({ message: "Compliance law deleted successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete compliance law.", error: error.message });
        }
    },
};