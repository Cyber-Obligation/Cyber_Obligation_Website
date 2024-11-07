module.exports = (db, DataTypes) =>
    db.sequelize.define("user", {
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        oauthProviderId: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });