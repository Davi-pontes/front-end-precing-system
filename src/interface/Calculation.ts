import type { IProductIngredient } from './Ingredient'

export interface IBasesCalculation {
  tax: number
  fixedCost: number
  freigth: number
  priceProduct: number
  qtyInBox: number
  sellingPrice: number
  profitPercentage: number
}
export interface ICalculationResult {
  costProduct: number
  pricePerUnit: number
  priceWithProfit: number
  profit: number
  profitPercentage: number
}
export interface IResultCalculationProductIngredient {
  fixed_cost: number
  revenue_cost: number
  profit: number
  final_recipe_price: number
  price_per_unit: number
  cost_of_all_ingredients: number
}
export interface IBasesCalculationProductWithIngredient {
  income: number
  recipe_time: number
  profit_percentage: number
  labor: number
  operacional_cost: number
  cost_of_all_ingredients: number
}
export interface IBaseCalculationSendService {
  productInformation: IBasesCalculationProductWithIngredient
  productIngredients: Array<IProductIngredient>
}
