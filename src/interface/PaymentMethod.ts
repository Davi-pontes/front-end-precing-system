export interface IPaymentMethod {
  id: number
  type: string
  tax: number
  status: number
}
export interface IPaymentMethodParams {
  id: number
  value: string
  label: string
  tax: number
}
