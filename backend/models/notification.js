module.exports = (db, DataTypes) =>
    db.sequelize.define("notification", {
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        sentAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });