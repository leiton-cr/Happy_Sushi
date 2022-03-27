import { Ingredient } from "./Ingredient";

export interface Dish{
    id?:number,
    name: String,
    price: number,
    picture?: any,
    ingredients?: Array<Ingredient>
  }