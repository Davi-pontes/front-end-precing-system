export interface IColumnsTableStockProduct{
    id_product: string
    name: string
    price_per_unit:number
    id_stock: number
    quantity: number
    updated_at: string
}
export interface IStockProduct{
    id_product: string
    name: string
    id_stock: number
    quantity: number
    updated_at: string
}