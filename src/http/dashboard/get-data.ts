import { HttpError } from '@/errors/errorsHttp'
import type { IDashboard } from '@/interface/Dashboard'
import { AxiosError, type Axios } from 'axios'

export class HttpGetDataToDashBoard {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async getDataToDashboard(idUser: string): Promise<IDashboard> {
    try {
      const { data } = await this.axios.get(this.baseUrl + '/dashboard', {
        params: {
          id: idUser
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
