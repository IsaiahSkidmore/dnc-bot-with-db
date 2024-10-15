import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

class CallHistory extends Model {}

CallHistory.init(
  {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CallHistory",
    timestamps: true,
  }
);

export default CallHistory;