import { HttpError } from '@/errors/errorsHttp'
import type { ICategory, ICategoryWithProducts } from '@/interface/Category'
import { AxiosError, type Axios } from 'axios'

export class HttpGetCategory {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async getAllCategoryAndProduct(idUser: string): Promise<ICategoryWithProducts> {
    try {
      const { data } = await this.axios.get(`${this.baseUrl}/category`, {
        params: { idUser },
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
  async getAllCategory(idUser: string): Promise<ICategory[]> {
    try {
      const { data } = await this.axios.get(`${this.baseUrl}/category/only`, {
        params: { idUser },
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
