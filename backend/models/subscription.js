module.exports = (db, DataTypes) =>
    db.sequelize.define("subscription", {
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: [['active', 'expired']],
            },
        },
    });