import { HttpError } from '@/errors/errorsHttp'
import type { IUser } from '@/interface/User'
import { AxiosError, type Axios } from 'axios'

export class HttpLogin {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async login(credentials: { email: string; password: string }): Promise<IUser> {
    try {
      const { data } = await this.axios.post(
        this.baseUrl + '/login',
        { email: credentials.email, password: credentials.password },
        { withCredentials: true }
      )
      return data as IUser
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new HttpError(error.message)
      }
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
