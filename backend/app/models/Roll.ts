import { Model, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, Association } from "sequelize";
import db from "../config/DB";
import Coverage from './Coverage';
import Dish from './Dish';


class Roll extends Model {

  declare getCoverage: HasManyGetAssociationsMixin<Coverage>;
  declare addCoverage: HasManyAddAssociationMixin<Coverage, number>;
  declare hasCoverage: HasManyHasAssociationMixin<Coverage, number>;



  declare readonly coverage?: Coverage;
  declare static associations: {
    coverage: Association<Coverage, Roll>;
  };
}

Roll.init(
  {
    id: {
      type: DataTypes.SMALLINT,
      primaryKey: true,
      references: {
        model: "Dish",
        key: "id"
      }
    },

    tempura: {
      type: DataTypes.BOOLEAN,
    },

    coverage: {
      type: DataTypes.TINYINT
    },

  
  },
  {
    sequelize: db,
    modelName: "tb_rolls",
    timestamps: false,
  }
);

export default Roll;

Roll.belongsTo(Dish, {foreignKey:"id", as:'dish'});
Dish.hasOne(Roll, {foreignKey:"id"});

Roll.hasOne(Coverage, {foreignKey:"id", sourceKey:"coverage", as:"cover"})


