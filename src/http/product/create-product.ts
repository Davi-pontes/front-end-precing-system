import { HttpError } from '@/errors/errorsHttp'
import type { IProduct } from '@/interface/Product'
import { AxiosError, type Axios } from 'axios'

export class HttpCreateProduct {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async createProduct(productData: any): Promise<IProduct> {
    try {
      const { data } = await this.axios.post(this.baseUrl + '/product', productData, {
        withCredentials: true
      })
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError(error.message)
      }
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
  async createOnlyProduct(productData: any): Promise<IProduct> {
    try {
      const { data } = await this.axios.post(this.baseUrl + '/product/only', productData, {
        withCredentials: true
      })
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError(error.message)
      }
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
