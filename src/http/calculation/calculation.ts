import { HttpError } from '@/errors/errorsHttp'
import type { IBasesCalculation, ICalculationResult } from '@/interface/Calculation'
import { AxiosError, type Axios } from 'axios'

export class HttpCalculation {
  private axios: Axios
  private baseUrl: string

  constructor(axiosInstance: Axios, baseUrl: string) {
    this.axios = axiosInstance
    this.baseUrl = baseUrl
  }

  async calculationDatasProduct(basesCalculation: IBasesCalculation): Promise<ICalculationResult> {
    try {
      const { data } = await this.axios.post(this.baseUrl + '/calculate', basesCalculation, {
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
