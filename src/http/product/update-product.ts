import type { IProduct } from '@/interface/Product'
import type { Axios } from 'axios'

export class HttpUpdateProduct {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async updateProduct(productData: any, idProduct: string): Promise<IProduct> {
    try {
      const { data } = await this.axios.put(this.baseUrl + '/product', productData, {
        params: {
          id: idProduct
        },
        withCredentials: true
      })
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
  async updateOnlyProduct(productData: any, idProduct: string): Promise<IProduct> {
    try {
      const { data } = await this.axios.put(this.baseUrl + '/product/only', productData, {
        params: {
          id: idProduct
        },
        withCredentials: true
      })
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
