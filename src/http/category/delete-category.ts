import type { Axios } from 'axios'

export class HttpDeleteCategory {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async deleteCatory(idCategory: string): Promise<any> {
    try {
      const { data } = await this.axios.delete(`${this.baseUrl}/category`, {
        params: { id: idCategory },
        withCredentials: true
      })
      return data
    } catch (error) {
      throw new Error('Não foi possível buscar as categorias e produtos.')
    }
  }
}
