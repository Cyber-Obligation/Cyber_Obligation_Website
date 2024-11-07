const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");


const db = {
    Op: Sequelize.Op
};


// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.DIALECT,
    pool: config.POOL,   // Connection pool settings
    logging: config.LOGGING  // Enable/disable SQL logging
});



// Test the connection
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });


// Create Schema using sequelize
// Include models
db.user = require("../models/user.js")(db, DataTypes);
db.subscription = require("../models/subscription.js")(db, DataTypes);
db.businessCategory = require("../models/businessCategory.js")(db, DataTypes);
db.complianceLaw = require("../models/complianceLaw.js")(db, DataTypes);
db.obligation = require("../models/obligation.js")(db, DataTypes);
db.subObligation = require("../models/subObligation.js")(db, DataTypes);
db.notification = require("../models/notification.js")(db, DataTypes);

// Associations
// TODO: Setup UUID as foreign Keys for each of the associal instead of using incremental ids(best practices)
// Users and Subscriptions (One-to-Many)
db.user.hasMany(db.subscription, { foreignKey: { name: "userId", allowNull: false } });
db.subscription.belongsTo(db.user, { foreignKey: { name: "userId", allowNull: false } });

// Users and Notifications (One-to-Many)
db.user.hasMany(db.notification, { foreignKey: { name: "userId", allowNull: false } });
db.notification.belongsTo(db.user, { foreignKey: { name: "userId", allowNull: false } });

// Business Categories and Compliance Law (Many-to-Many)
db.complianceLawCategory = require("../models/complianceLawCategories.js")(db, DataTypes);
db.businessCategory.belongsToMany(db.complianceLaw, { through: db.complianceLawCategory, foreignKey: 'categoryId'});
db.complianceLaw.belongsToMany(db.businessCategory, { through: db.complianceLawCategory, foreignKey: 'lawId'});

// Business Categories and Users (Many-to-Many)
db.userCategory = require("../models/userCategory.js")(db, DataTypes);
db.user.belongsToMany(db.businessCategory, { through: db.userCategory, foreignKey: 'userId'});
db.businessCategory.belongsToMany(db.user, { through: db.userCategory, foreignKey: 'categoryId'});

// Compliance Laws and Obligations (One-to-Many)
db.complianceLaw.hasMany(db.obligation, { foreignKey: { name: "lawId", allowNull: false } });
db.obligation.belongsTo(db.complianceLaw, { foreignKey: { name: "lawId", allowNull: false } });

// Obligations and SubObligations (One-to-Many)
db.obligation.hasMany(db.subObligation, { foreignKey: { name: "obligationId", allowNull: false } });
db.subObligation.belongsTo(db.obligation, { foreignKey: { name: "obligationId", allowNull: false } });

// Compliance Laws and Notifications (One-to-Many)
db.complianceLaw.hasMany(db.notification, { foreignKey: { name: "lawId", allowNull: false } });
db.notification.belongsTo(db.complianceLaw, { foreignKey: { name: "lawId", allowNull: false } });

async function seedDataUser() {
    const count = await db.user.count();

    if (count > 0) return;

    // User 1
    const user1 = {
        email: "user1@example.com",
        name: "John Doe",
        profilePicture: "profile1.jpg",
        accessToken: "token1",
        refreshToken: "refreshToken1",
        oauthProviderId: "provider1"
    };
    await db.user.create(user1);

    // User 2
    const user2 = {
        email: "user2@example.com",
        name: "Jane Smith",
        profilePicture: "profile2.jpg",
        accessToken: "token2",
        refreshToken: "refreshToken2",
        oauthProviderId: "provider2"
    };
    await db.user.create(user2);

    // User 3
    const user3 = {
        email: "user3@example.com",
        name: "Alice Johnson",
        profilePicture: "profile3.jpg",
        accessToken: "token3",
        refreshToken: "refreshToken3",
        oauthProviderId: "provider3"
    };
    await db.user.create(user3);

    // User 4
    const user4 = {
        email: "user4@example.com",
        name: "Bob Brown",
        profilePicture: "profile4.jpg",
        accessToken: "token4",
        refreshToken: "refreshToken4",
        oauthProviderId: "provider4"
    };
    await db.user.create(user4);

    // User 5
    const user5 = {
        email: "user5@example.com",
        name: "Charlie White",
        profilePicture: "profile5.jpg",
        accessToken: "token5",
        refreshToken: "refreshToken5",
        oauthProviderId: "provider5"
    };
    await db.user.create(user5);
};


async function seedDataBusinessCategory() {
    const count = await db.businessCategory.count();

    if (count > 0) return;

    await db.businessCategory.bulkCreate([
        { name: "Retail", description: "Retail businesses including e-commerce." },
        { name: "Manufacturing", description: "Manufacturing industries and factories." },
        { name: "Healthcare", description: "Healthcare and medical-related businesses." },
        { name: "Finance", description: "Banks and financial institutions." },
        { name: "Technology", description: "Technology companies including software." },
    ]);
};


async function seedDataComplianceLaw() {
    const count = await db.complianceLaw.count();

    if (count > 0) return;

    await db.complianceLaw.bulkCreate([
        { 
            title: "GDPR Compliance", 
            description: "General Data Protection Regulation for businesses operating in the EU.", 
            dateEffective: "2023-05-25", 
            isActive: true, 
            regionCategory: "Federal", 
            interpretation: "Regulation for data protection and privacy." 
        },
        { 
            title: "CCPA", 
            description: "California Consumer Privacy Act for businesses in California.", 
            dateEffective: "2020-01-01", 
            isActive: true, 
            regionCategory: "State", 
            interpretation: "Protecting consumer privacy in California." 
        },
        { 
            title: "HIPAA", 
            description: "Health Insurance Portability and Accountability Act for healthcare businesses.", 
            dateEffective: "1996-08-21", 
            isActive: true, 
            regionCategory: "Industry", 
            interpretation: "Protects patient health information." 
        },
        { 
            title: "PCI-DSS", 
            description: "Payment Card Industry Data Security Standard for businesses handling card payments.", 
            dateEffective: "2018-04-16", 
            isActive: true, 
            regionCategory: "Federal", 
            interpretation: "Standard for securing payment card transactions." 
        },
        { 
            title: "COPPA", 
            description: "Children’s Online Privacy Protection Act for websites directed at children.", 
            dateEffective: "1998-04-21", 
            isActive: true, 
            regionCategory: "Federal", 
            interpretation: "Protects children’s personal data online." 
        },
    ]);
};



async function seedDataSubscription() {
    const count = await db.subscription.count();

    if (count > 0) return;

    const users = await db.user.findAll();

    if (!users.length) throw new Error("Users not found");

    await db.subscription.bulkCreate([
        { userId: users[0].id, startDate: "2023-01-01", endDate: "2024-01-01", status: "active" },
        { userId: users[1].id, startDate: "2023-03-01", endDate: "2024-03-01", status: "expired" },
        { userId: users[0].id, startDate: "2023-05-15", endDate: "2024-05-15", status: "active" },
        { userId: users[1].id, startDate: "2023-06-01", endDate: "2024-06-01", status: "expired" },
        { userId: users[0].id, startDate: "2023-07-01", endDate: "2024-07-01", status: "active" },
    ]);
}


async function seedDataObligation() {
    const count = await db.obligation.count();
    if (count > 0) return;

    const complianceLaw = await db.complianceLaw.findOne({ where: { title: "GDPR Compliance" } }); // Example law, assuming title is unique
    if (!complianceLaw) throw new Error("Compliance law not found");

    await db.obligation.bulkCreate([
        { 
            title: "Data Protection Impact Assessment", 
            description: "Assess the risks of data processing and mitigate them to protect user privacy.", 
            interpretation: "An assessment conducted before initiating processing activities that may affect user data privacy.", 
            lawId: complianceLaw.id 
        },
        { 
            title: "Ensure Data Portability", 
            description: "Ensure that users can transfer their data between different service providers.", 
            interpretation: "Allow users to request and receive their personal data in a machine-readable format for portability.", 
            lawId: complianceLaw.id 
        },
        { 
            title: "Notify Data Breaches", 
            description: "Notify the appropriate authorities and affected individuals if a data breach occurs.", 
            interpretation: "The obligation to report data breaches within a specific time frame, as required by GDPR.", 
            lawId: complianceLaw.id 
        },
    ]);
};


async function seedDataSubObligation() {
    const count = await db.subObligation.count();
    if (count > 0) return;

    // Fetch the obligations related to the 'GDPR Compliance' law
    const obligations = await db.obligation.findAll({ where: { lawId: 1 } });

    if (!obligations.length) throw new Error("Obligations not found");

    await db.subObligation.bulkCreate([
        { 
            title: "Risk Evaluation for Data Processing", 
            description: "Evaluate risks associated with data processing activities.", 
            interpretation: "Detailed assessment of potential risks to user privacy during data processing.", 
            obligationId: obligations[0].id 
        },
        { 
            title: "Data Portability Options", 
            description: "Provide users with the ability to transfer their data to another service.", 
            interpretation: "Offer data portability services that comply with regulatory requirements for data transfer.", 
            obligationId: obligations[1].id 
        },
        { 
            title: "Notify Authorities within 72 Hours", 
            description: "Inform relevant authorities about any data breach within 72 hours.", 
            interpretation: "Immediate action required to notify authorities about data breaches, as stipulated by GDPR.", 
            obligationId: obligations[2].id 
        },
    ]);
};

// Junction Table
async function seedDataComplianceLawCategory() {
    const count = await db.complianceLawCategory.count();
    if (count > 0) return;

    const laws = await db.complianceLaw.findAll();

    if (!laws.length) throw new Error("Laws not found");

    await db.complianceLawCategory.bulkCreate([
        { lawId: laws[0].id, categoryId: 1 },
        { lawId: laws[1].id, categoryId: 2 },
    ]);
}

// Junction Table
async function seedDataUserCategory() {
    const count = await db.userCategory.count();
    if (count > 0) return;

    const users = await db.user.findAll();
    const categories = await db.businessCategory.findAll();

    if (!users.length || !categories.length) throw new Error("Users or Categories not found");

    await db.userCategory.bulkCreate([
        { userId: users[0].id, categoryId: categories[0].id },
        { userId: users[1].id, categoryId: categories[1].id },
    ]);
}

db.sync = async () => {
    // Sync schema.
    // TODO: Definitely remove this true from here it is destructive.
    await db.sequelize.sync({ force: true });

    // Seed data for all models
    await seedDataUser();
    await seedDataBusinessCategory();
    await seedDataComplianceLaw();
    await seedDataSubscription(); //contains relationship to user
    await seedDataObligation(); //contains relationship to complianceLaw
    await seedDataSubObligation(); //contains relationship to obligation

    // Seed data for junction tables
    await seedDataComplianceLawCategory();
    await seedDataUserCategory();

    console.log("Mock Data has been seeded successfully!");
};

// Export DB
module.exports = db;

