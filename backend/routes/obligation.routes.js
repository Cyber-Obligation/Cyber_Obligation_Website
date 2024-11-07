module.exports = (express, app) => {
    const controller = require("../controllers/obligation.controllers.js");
    const router = express.Router();

    // Create Obligation
    router.post("/createObligation", controller.createObligation);

    // Get Obligation by id
    router.get("/:obligationId", controller.getObligationById);

    // Get all Obligations by lawId
    router.get("/law/:lawId", controller.getAllObligationsByLawId);

    // Update Obligation by id
    router.patch("/:obligationId", controller.updateObligationById);

    // Delete Obligation by id
    router.delete("/:obligationId", controller.deleteObligationById);

    // Add routes to server.
    app.use("/api/obligations", router);
};