import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class User extends Model {
  // Define association with Comment model
  static associate(models) {
    User.hasMany(models.Comment, { foreignKey: "userId" }); // One user can have many comments
  }
}

// Define the User model
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true, // Automatically manages `createdAt` and `updatedAt`
  },
);

export default User;