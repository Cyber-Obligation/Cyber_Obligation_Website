module.exports = (db, DataTypes) =>
    db.sequelize.define("complianceLaw", {
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        dateEffective: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        regionCategory: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                isIn: [['Federal', 'State', 'Industry']],
            },
        },
        interpretation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });