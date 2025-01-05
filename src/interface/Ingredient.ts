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

export  interface IUpdateIngredient {
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

export type Unit = "GRAMAS" | "UNIDADE" | "ML";