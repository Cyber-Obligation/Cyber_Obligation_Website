module.exports = (db, DataTypes) =>
    db.userCategory = db.sequelize.define('UserCategory', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: db.user,
                key: 'user_id'
            },
            onDelete: 'CASCADE'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: db.businessCategory,
                key: 'category_id'
            },
            onDelete: 'CASCADE'
        },
    });