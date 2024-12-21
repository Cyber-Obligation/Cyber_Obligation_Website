// server.js
require('dotenv').config();
const cookieParser = require("cookie-parser"); // To parse cookies.
const bodyParser = require("body-parser") // To parse req/res body.
const csrf = require("csurf"); // To prevent CSRF Attacks
const express = require('express');
// const helmet = require('helmet'); 
const morgan = require('morgan'); // For logging in console for development
const cors = require('cors'); // to setup cors

// Database ORM
const db = require("./database/db")

// Firebase Authentication Setup
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// CSRF Token Setup
const csrfMiddleware = csrf({ cookie: true });


const app = express();

// Middleware order
// app.use(helmet());         // Security headers
app.use(morgan('dev'));    // Logs requests
app.use(cors());           // Enables CORS for all origins
app.use(bodyParser.json());// Parses JSON request bodies
app.use(cookieParser());   // Parses cookies
app.use(csrfMiddleware);   // CSRF protection (after cookie parser)

// Setup XSRF Token for user session to prevent CSRF Attack.
app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

// Sync the database.
db.sync()

// Routes
require("./routes/user.routes.js")(express, app)
// require("./routes/subscription.routes.js/")(express, app)
require("./routes/subObligation.routes.js")(express, app)
require("./routes/obligation.routes.js")(express, app)
// require("./routes/notification.routes.js")(express, app)
// require("./routes/complianceLawCategories.routes.js/")(express, app)
require("./routes/complianceLaw.routes.js")(express, app)
require("./routes/businessCategory.routes.js")(express, app)


// Session Login Endpoint
app.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();

    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
        (sessionCookie) => {
            const options = { maxAge: expiresIn, httpOnly: true };
            res.cookie("session", sessionCookie, options);
            res.end(JSON.stringify({ status: "success" }));
        },
        (error) => {
            res.status(401).send("UNAUTHORIZED REQUEST!");
        }
        );
});

// Session Logout Endpoint
app.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});