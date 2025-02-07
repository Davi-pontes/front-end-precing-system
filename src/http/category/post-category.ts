import type { ICategory } from '@/interface/Category'
import type { Axios } from 'axios'

export class HttpPostCategory {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async createCategory(dataForSend: ICategory): Promise<any> {
    try {
      const { data } = await this.axios.post(`${this.baseUrl}/category`, dataForSend, {
        withCredentials: true
      })
      return data
    } catch (error) {
      throw new Error('Não foi possível buscar as categorias e produtos.')
    }
  }
}
