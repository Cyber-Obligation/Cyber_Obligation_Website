module.exports = (express, app) => {
    const controller = require("../controllers/subscription.controllers.js");
    const router = express.Router();

    // Create Subscription
    router.post("/createSubscription", controller.createSubscription);

    // Get Subscription by userID
    router.get("/user/:userId", controller.getSubscriptionByUserId);

    // Get Subscription by id
    router.get("/:subscriptionId", controller.getSubscriptionById);

    // Update Subscription by userID
    router.patch("/user/:userId", controller.updateSubscriptionByUserId);

    // Update Subscription by id
    router.patch("/:subscriptionId", controller.updateSubscriptionById);

    // Delete Subscription by id
    router.delete("/:subscriptionId", controller.deleteSubscriptionById);

    // Add routes to server.
    app.use("/api/subscriptions", router);
};