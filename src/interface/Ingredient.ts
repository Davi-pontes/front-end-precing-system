export interface IIngredient {
  id: number
  name: string
  weight: number
  unit1: string
  price: number
  quantity: number
  unit2: string
  ingredient_cost: number
  id_product: string
  quantity_in_stock: number
  total_cash_in_stock: number
}
export interface IProductIngredient {
  name: string 
  weight: number 
  unit1: string
  price: number 
  unit2: string 
  quantity: number 
  ingredient_cost: number
}
export interface IColumnsTableStockIngredient {
  id: number
  name: string
  weight: number
  price: number
  quantity: number
}

export interface IUpdateIngredient {
  id?: number
  name?: string
  weight?: number
  unit1?: Unit
  price?: number
  quantity?: number
  unit2?: Unit
  ingredient_cost?: number
  id_product?: string
  quantity_in_stock?: number
  total_cash_in_stock?: number
}
export interface IUpdatedIngredient {
  updatedIngredient: IUpdateIngredient
  updatedNumbersIngredient: {
    quantityOfProductsChanged: number
    updatedIngredientCost: number
  }
}
export interface IColumnsTableIngredient {
  name: string
  unit1: string
  weight: string
  price: string
  onUpdate: (data: any) => void
}
export type Unit = 'GRAMAS' | 'UNIDADE' | 'ML'
