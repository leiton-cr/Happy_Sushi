import { Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association } from "sequelize";
import db from "../config/DB";
import Ingredient from './Ingredient';

class Dish extends Model {

  declare getIngredients: HasManyGetAssociationsMixin<Ingredient>;
  declare addIngredient: HasManyAddAssociationMixin<Ingredient, number>;
  declare hasIngredient: HasManyHasAssociationMixin<Ingredient, number>;
  declare countIngredients: HasManyCountAssociationsMixin;
  declare createIngredient: HasManyCreateAssociationMixin<Ingredient>;


  declare readonly ingredients?: Ingredient[];
  declare static associations: {
    ingredients: Association<Ingredient, Dish>;
  };
}

Dish.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
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
    modelName: "tb_dishes",
    timestamps: false,
  }
);

export default Dish;

Ingredient.belongsToMany(Dish, {through: 'tb_ingredients_dishes', timestamps: false, foreignKey: 'ingredient_id' });
Dish.belongsToMany(Ingredient, {through: 'tb_ingredients_dishes', as: 'ingredients', timestamps: false, foreignKey: 'dish_id' });
