import { HttpError } from '@/errors/errorsHttp'
import { AxiosError, type Axios } from 'axios'

export class HttpDeleteProduct {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async deleteProduct(idProduct: string): Promise<any> {
    try {
      const { data } = await this.axios.delete(this.baseUrl + '/product', {
        params: {
          id: idProduct
        },
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
