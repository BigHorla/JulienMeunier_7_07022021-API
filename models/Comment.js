const { DataTypes } = require("sequelize");

const Comment = sequelize.define("Comment", {
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
});

Comment.associate = (models) => {
  Comment.belongsTo(models.Article);
  Comment.belongsTo(models.User);
};

/* Comment.sequelize.sync({ force: true }); */
