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
}

export interface IColumnsTableProduct extends IProduct{}