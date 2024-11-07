module.exports = (db, DataTypes) => 
    db.complianceLawCategory = db.sequelize.define('ComplianceLawCategory', {
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: db.businessCategory,
                key: 'category_id'
            },
            onDelete: 'CASCADE'
        },
        lawId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: db.complianceLaw,
                key: 'law_id'
            },
            onDelete: 'CASCADE'
        },
    });