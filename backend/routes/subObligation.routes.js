module.exports = (express, app) => {
    const controller = require("../controllers/subObligation.controllers.js");
    const router = express.Router();

    // Create SubObligation
    router.post("/createSubObligation", controller.createSubObligation);

    // Get SubObligation by id
    router.get("/:subObligationId", controller.getSubObligationById);

    // Get all SubObligations by obligationId
    router.get("/obligation/:obligationId", controller.getAllSubObligationsByObligationId);

    // Update SubObligation by id
    router.patch("/:subObligationId", controller.updateSubObligationById);

    // Delete SubObligation by id
    router.delete("/:subObligationId", controller.deleteSubObligationById);

    // Add routes to server.
    app.use("/api/subObligations", router);
};