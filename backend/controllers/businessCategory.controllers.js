// businessCategory.controllers.js

const db = require("../database/db");
const complianceLaw = require("../models/complianceLaw");


module.exports = {
    // Create a new Business Category
    createBusinessCategory: async (req, res) => {
        try {
            const { name, description } = req.body;

            if (!name || !description) {
                return res.status(400).json({ message: "Name and description are required." });
            }

            const newCategory = await db.businessCategory.create({ name, description });
            res.status(201).json({ message: "Business category created successfully.", data: newCategory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to create business category.", error: error.message });
        }
    },

    // Get a Business Category by ID with all the laws associated with it.
    getBusinessCategoryById: async (req, res) => {
        try {
            const { categoryId } = req.params;

            const category = await db.businessCategory.findById(categoryId,
                {
                    include: {
                        model: complianceLaw,
                        through: {
                            attributes: [],
                        },
                    },
                }
            );
            if (!category) {
                return res.status(404).json({ message: "Business category not found." });
            }

            res.status(200).json({ data: category });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch business category.", error: error.message });
        }
    },

    // Get all Business Categories
    getAllBusinessCategories: async (req, res) => {
        try {
            const categories = await db.businessCategory.findAll();
            res.status(200).json({ data: categories });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch business categories.", error: error.message });
        }
    },

    // Update a Business Category by ID
    updateBusinessCategoryById: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const { name, description } = req.body;

            const updatedCategory = await db.businessCategory.update(categoryId, { name, description });
            if (!updatedCategory) {
                return res.status(404).json({ message: "Business category not found or not updated." });
            }

            res.status(200).json({ message: "Business category updated successfully.", data: updatedCategory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to update business category.", error: error.message });
        }
    },

    // Delete a Business Category by ID
    deleteBusinessCategoryById: async (req, res) => {
        try {
            const { categoryId } = req.params;

            const deleted = await businessCategoryService.delete(categoryId);
            if (!deleted) {
                return res.status(404).json({ message: "Business category not found or not deleted." });
            }

            res.status(200).json({ message: "Business category deleted successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete business category.", error: error.message });
        }
    },
};