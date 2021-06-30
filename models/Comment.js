const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Comments",
  }
);

Comment.associate = (models) => {
  Comment.belongsTo(models.Article);
  Comment.belongsTo(models.User);
};

module.exports = Comment;

/* Comment.sequelize.sync({ force: true }); */
