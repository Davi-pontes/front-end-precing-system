import type { IProduct } from "./Product"

export interface IDashboard {
    averageProfit: number
    totalProduct: number
    productsWithHiguerProfit: IProduct[]
}