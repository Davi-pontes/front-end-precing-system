import { HttpError } from '@/errors/errorsHttp'
import type { IProduct } from '@/interface/Product'
import { AxiosError, type Axios } from 'axios'

export class HttpDuplicateProduct {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async duplicateProduct(idProduct: string): Promise<IProduct> {
    try {
      const { data } = await this.axios.post(this.baseUrl + `/product/duplicate`, {id:idProduct},{
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
