module.exports = (express, app) => {
    const controller = require("../controllers/complianceLaw.controllers.js");
    const router = express.Router();

    // Create Compliance Law
    router.post("/createComplianceLaw", controller.createComplianceLaw);

    // Get Compliance Law by id
    router.get("/:lawId", controller.getComplianceLawById);

    // Get all Compliance Laws
    router.get("/", controller.getAllComplianceLaws);

    // Update Compliance Law by id
    router.patch("/:lawId", controller.updateComplianceLawById);

    // Delete Compliance Law by id
    router.delete("/:lawId", controller.deleteComplianceLawById);

    // Add routes to server.
    app.use("/api/complianceLaws", router);
};