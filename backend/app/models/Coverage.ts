import { Model, DataTypes } from "sequelize";
import db from "../config/DB";

class Coverage extends Model {}

Coverage.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.BLOB,
    },
    state: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: db,
    modelName: "tb_coverages",
    timestamps: false,
  }
);

export default Coverage;