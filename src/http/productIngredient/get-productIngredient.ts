import type { IProductIngredient } from '@/interface/Ingredient'
import type { Axios } from 'axios'

export class HttpGetProductIngredient {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async getProductIngredient(idProduct: string): Promise<IProductIngredient[]> {
    try {
      const { data } = await this.axios.get(this.baseUrl + '/product/ingredient', {
        params: {
          id: idProduct
        },
        withCredentials: true
      })
      return data
    } catch (error) {
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
