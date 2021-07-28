const { DataTypes } = require("sequelize");

const Article = sequelize.define("Articles", {
  id: {
  allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  AuthorId: {
    allowNull: false,
    foreignKey: true,
    type: DataTypes.INTEGER,
    defaultValue: DataTypes.INTEGER,
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING(50),
  },
  content: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  attachment: {
    allowNull: true,
    type: DataTypes.STRING(250),
  },
  likes: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
  },
  wholike: {
    allowNull: false,
    defaultValue: "",
    type: DataTypes.STRING,
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

Article.associate = (models) => {
  Article.belongsTo(models.User, {
    foreignKey: {
      allowNull: true,
    },
  });
  Article.hasMany(models.Comment, {
    onDelete: "cascade",
  });
};

module.exports = Article;

/* Article.sequelize.sync({ force: true }) */;
