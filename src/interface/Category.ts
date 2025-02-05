import type { IProduct } from './Product'

export interface ICategory {
  id: string
  name: string
  user_id: string
}

export interface ICategoryWithProducts {
  category: ICategory[]
  products: IProduct[]
  totalProducts: number
  averageProfit: number
}
