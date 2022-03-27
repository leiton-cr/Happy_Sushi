import { Model, DataTypes } from "sequelize";
import db from "../config/DB";

class Ingredient extends Model {}

Ingredient.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    type: {
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
    modelName: "tb_ingredients",
    timestamps: false,
  }
);

export default Ingredient;