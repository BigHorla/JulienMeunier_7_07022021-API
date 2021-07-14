
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    roles: {
      allowNull: false,
      defaultValue: "user",
      type: DataTypes.ENUM("admin", "user"),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(255),
    },
    profileImage: {
      allowNull: false,
      type: DataTypes.STRING(255),
      defaultValue: "../../assets/profilPictures/default.jpg",
    },
    email: {
      unique: true,
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    lastName: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    job: {
      allowNull: true,
      type: DataTypes.STRING(50),
    },
    bio: {
      allowNull: true,
      type: DataTypes.STRING(350),
    },
    birthday: {
      allowNull: true,
      type: DataTypes.DATE,
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
    tableName: "Users",
  }
);

User.associate = (models) => {
  User.hasMany(models.Article, {
    onDelete: "cascade",
  });
  User.hasMany(models.Comment, {
    onDelete: "cascade",
  });
};

module.exports = User;
