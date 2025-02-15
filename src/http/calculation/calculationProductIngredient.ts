import { HttpError } from '@/errors/errorsHttp'
import type { IBaseCalculationSendService, IResultCalculationProductIngredient } from '@/interface/Calculation'
import { AxiosError, type Axios } from 'axios'

export class HttpCalculationProductWithIngredient {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async calculationDatasProductWithIngredient(basesCalculation: IBaseCalculationSendService): Promise<IResultCalculationProductIngredient> {
    try {
      const { data } = await this.axios.post(this.baseUrl + '/calculate/product-ingredient', basesCalculation, {
        withCredentials: true
      })
      return data
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new HttpError(error.message)
      }
      throw new Error('Não foi possivel concluir solicitação.')
    }
  }
}
