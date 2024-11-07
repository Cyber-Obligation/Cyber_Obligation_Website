module.exports = (db, DataTypes) =>
    db.sequelize.define("businessCategory", {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
