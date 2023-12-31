module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
   }, {
    tableName: 'categories',
    underscored: true,
    timestamps: false
  })

  // User.associate = (models) => {
  //   User.belongsTo(models.post_categories)
  // }
  
  return Category;
};