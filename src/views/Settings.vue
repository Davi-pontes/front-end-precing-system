<script setup lang="ts">
import axios, { AxiosError } from 'axios'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import type { IPaymentMethod, IPaymentMethodParams } from '@/interface/PaymentMethod'
import CardPaymentMethod from '@/components/CardPaymentMethod.vue'
import CardProfile from '@/components/CardProfile.vue'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const route = useRoute()
const idUser = route.query.id

const showMessageAlert = ref<boolean>(false)
const showMessageErro = ref<boolean>(false)
const messageForAlert = ref<string>('')
const messageForError = ref<string>('')
const userProfileData = ref()

const paymentMethods = ref<IPaymentMethodParams[]>([])

const typeTranslations: Record<string, string> = {
  money: 'Dinheiro',
  credit_card: 'Cartão de Crédito',
  debit_card: 'Cartão de Débito',
  ticket: 'Boleto',
  pix: 'Pix'
}
// Função para mostrar alertas de error
function handleError(message: string) {
  messageForError.value = message
  showMessageErro.value = true
}
// Função para mostrar alertas
function handleAlert(message: string) {
  messageForAlert.value = message
  showMessageAlert.value = true
}

// Função para remover alertas
function removeAlert() {
  showMessageAlert.value = false
}
// Função para remover alertas de erro
function removeAlertError() {
  showMessageErro.value = false
}
// Função para buscar todas as formas de pagamento do usuario
async function getUserProfileData() {
  try {
    const { data } = await axios.get(urlApiBackEnd + '/user/' + idUser, {
      withCredentials: true
    })
    userProfileData.value = data
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
// Função para buscar todas as formas de pagamento do usuario
async function getPaymentMethodByIdUser() {
  try {
    const { data } = await axios.get(urlApiBackEnd + '/payment/method', {
      params: { idUser: idUser },
      withCredentials: true
    })
    formatedTypePayment(data)
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
// Função para enviar todas as formas de pagamento atualizadas
async function sendPaymentMethodsToUpdate(paymentMethodToUpdate: any) {
  try {
    const paymentMethodsAlteredAndFormated = formatedTypePaymentToSendBackEnd(paymentMethodToUpdate)

    const { data } = await axios.put(
      urlApiBackEnd + '/payment/method',
      { paymentMethods: paymentMethodsAlteredAndFormated },
      {
        params: { idUser: idUser },
        withCredentials: true
      }
    )
    if (data.length > 0) {
      handleAlert('Taxas de pagamento alteradas com sucesso!')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
function formatedTypePayment(methods: IPaymentMethod[]) {
  const formattedMethods = methods.map((method: IPaymentMethod) => ({
    id: method.id,
    value: method.type,
    label: typeTranslations[method.type] || 'Desconhecido',
    tax: method.tax
  }))

  paymentMethods.value = formattedMethods
}
function formatedTypePaymentToSendBackEnd(dataToFormated:any): IPaymentMethod[] {
  const formattedMethods = dataToFormated.value.map((method: IPaymentMethodParams) => ({
    id: method.id,
    type: method.value,
    tax: method.tax,
    status: 1
  }))

  return formattedMethods
}
getPaymentMethodByIdUser()
getUserProfileData()
</script>

<template>
  <div class="w-full">
    <MessageError
      v-if="showMessageErro"
      :message="messageForError"
      @removeAlert="removeAlertError"
    />
    <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
    <CardPaymentMethod :paymentMethods="paymentMethods" @update="sendPaymentMethodsToUpdate"/>
    <CardProfile :dataProfileUser="userProfileData"/>
  </div>
</template>
