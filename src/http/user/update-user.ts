import type { Axios } from 'axios'

export class HttpUpdateUser {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async updateDisableUser(idUser: string): Promise<string> {
    try {
      const { data } = await this.axios.patch(
        this.baseUrl + '/user/disable',
        { idUser: idUser },

        { withCredentials: true }
      )
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
  async updateActivateUser(idUser: string): Promise<string> {
    try {
      const { data } = await this.axios.patch(
        this.baseUrl + '/user/activate',
        { idUser: idUser },

        { withCredentials: true }
      )
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
