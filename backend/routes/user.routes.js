module.exports = (express, app) => {
    const controller = require("../controllers/user.controllers.js");
    const router = express.Router();

    // Get user by oauthProviderId (Send this in the body)
    // TODO: Setup hasing for transmitting and storing oauthProviderId
    router.post("/oauth", controller.getUserByOauthProviderId);

    // Create user by id
    router.post("/createUser", controller.createUser);

    // Delete user by id
    router.delete("/user/:userId", controller.removeUserById);

    // Update user by id
    router.patch("/user/:userId", controller.updateUserById);

    // Add routes to server.
    app.use("/api/users", router);
};