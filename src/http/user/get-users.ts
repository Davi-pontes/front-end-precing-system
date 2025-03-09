import type { IUser } from '@/interface/User'
import type { Axios } from 'axios'
import { getUserIdLocalStorage } from '@/composables/getUserId'

export class HttpGetUser {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async getUsers(): Promise<Array<IUser>> {
    try {
      const idUser = getUserIdLocalStorage()

      const { data } = await this.axios.get(this.baseUrl + '/admin/user', {
        params: {
          idUser
        },
        withCredentials: true
      })
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
