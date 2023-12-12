module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
   },
   {
    tableName: 'posts_categories',
    underscored: true,
    timestamps: false
  })

  PostCategory.associate = ({ Category, BlogPost }) => {
    
    Category.belongsToMany(BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'category_id',
      other: 'post_id',
    });

    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'post_id',
      other: 'category_id',
    });

  }
  
  return PostCategory;
};
