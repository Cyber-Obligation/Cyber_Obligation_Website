module.exports = (express, app) => {
    const controller = require("../controllers/businessCategory.controllers.js");
    const router = express.Router();

    // Create Business Category
    router.post("/createBusinessCategory", controller.createBusinessCategory);

    // Get Business Category by id
    router.get("/:categoryId", controller.getBusinessCategoryById);

    // Get all Business Categories
    router.get("/", controller.getAllBusinessCategories);

    // Update Business Category by id
    router.patch("/:categoryId", controller.updateBusinessCategoryById);

    // Delete Business Category by id
    router.delete("/:categoryId", controller.deleteBusinessCategoryById);

    // Add routes to server.
    app.use("/api/businessCategories", router);
};