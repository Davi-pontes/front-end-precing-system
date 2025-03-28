import { HttpError } from '@/errors/errorsHttp'
import { AxiosError, type Axios } from 'axios'

export class HttpGetProduct {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async getSpecificProduct(idProduct: string): Promise<any> {
    try {
      const { data } = await this.axios.get(this.baseUrl + '/product/specific', {
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
