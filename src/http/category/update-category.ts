import type { ICategory } from '@/interface/Category'
import type { Axios } from 'axios'

export class HttpPathCategory {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async updateCategory(dataForSend: ICategory): Promise<any> {
    try {
        //Usado metodo path por que só é possivel alterar o nome da categoria.
      const { data } = await this.axios.patch(
        `${this.baseUrl}/category`,
        { name: dataForSend.name },
        {
          params: { id: dataForSend.id },
          withCredentials: true
        }
      )
      return data
    } catch (error) {
      throw new Error('Não foi possível buscar as categorias e produtos.')
    }
  }
}
