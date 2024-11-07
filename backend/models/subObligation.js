module.exports = (db, DataTypes) =>
    db.sequelize.define("subObligation", {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        interpretation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });