export interface IColumnsTableOrder {
  id: number
  total: number
  type_payment_method: number
}

export interface IOrder {
  id: number
  discount: number
  type_payment_method: string
  tax: number
  sub_total: number
  total: number
  id_user: string
  created_at: string
}
