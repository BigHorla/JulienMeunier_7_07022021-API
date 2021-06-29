const { DataTypes } = require("sequelize");

const Article = sequelize.define("Articles", {
  id: {
    allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
  },
  UserId: {
    allowNull: false,
    foreignKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  content: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  attachment: {
    allowNull: true,
    type: DataTypes.STRING(120),
  },
  like: {
    allowNull: false,
    defaultValue: 0,
    type: DataTypes.INTEGER,
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

/* Article.sequelize.sync({ force: true }) */;
