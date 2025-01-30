export interface IProduct {
  id_product: string
  name: string
  weight: number
  unit1: string
  price: number
  unit2: number
  quantity: number
  ingredientCost: number
  currentPrice: number
  income: number
  revenue_cost: number
  profit: number
  price_per_unit: number
  only: boolean
  id_category: string
}
export interface IProductRender {
  nameProduct: string
  recipeTime: number
  operationalCost: number
  profitPecentage: number
  costOfRevenue: number
  fixedCost: number
  labor: number
  income: number
  profit: number
  pricePerUnit: number
  costOfAllIngredients: number
  priceFinalRevenue: number
  isJoker: number
}

export interface IColumnsTableProduct extends IProduct {}
