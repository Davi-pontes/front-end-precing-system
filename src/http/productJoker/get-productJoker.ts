import type { Axios } from 'axios'

export class HttpGetProductJoker {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async getProductJoker(idUser: string): Promise<any> {
    try {
      const { data } = await this.axios.get(this.baseUrl + '/product/joker', {
        params: {
          idUser: idUser
        },
        withCredentials: true
      })
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
