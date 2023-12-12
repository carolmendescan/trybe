'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts_categories', {
      post_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        primaryKey: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    })
  },

  down: async (queryInterface) => {
    return queryInterface.dropTable('posts_categories');
  }
};

