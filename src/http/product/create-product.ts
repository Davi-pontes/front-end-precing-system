import type { IProduct } from '@/interface/Product'
import type { Axios } from 'axios'

export class HttpCreateProduct {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async createProduct(productData: any): Promise<IProduct> {
    try {
      const {data}=await this.axios.post(this.baseUrl + '/product', productData, { withCredentials: true })
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
