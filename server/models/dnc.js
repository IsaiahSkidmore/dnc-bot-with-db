import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class DNC extends Model {}

DNC.init(
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "DNC",
    timestamps: true,
  }
);

export default DNC;