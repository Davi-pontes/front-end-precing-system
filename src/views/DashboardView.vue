<script setup lang="ts">
import axios from 'axios'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import Card from '@/components/Card.vue'
import { ref } from 'vue'
import { getUserDataLocalStorage } from '@/composables/getUserData'
import { HttpGetDataToDashBoard } from '@/http/dashboard/get-data'
import type { IDashboard } from '@/interface/Dashboard'
import { HttpError } from '@/errors/errorsHttp'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const messageForError = ref('')
const showMessageErro = ref(false)
const messageForAlert = ref('')
const showMessageAlert = ref(false)
const dataToDashboard = ref<IDashboard>({
  totalProduct: 0,
  averageProfit: 0
})
const nameUser = ref('')
const idUser = ref('')

const httpGetDataDashboard = new HttpGetDataToDashBoard(axios,urlApiBackEnd)

function getLocalStorage(): void {
  try {
    const userData = getUserDataLocalStorage()

    nameUser.value = userData.name
    idUser.value = userData.id
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:')
  }
}
async function getDataToDashboard(): Promise<void> {
  try {
    const data = await httpGetDataDashboard.getDataToDashboard(idUser.value)

    if (data) dataToDashboard.value = data
    
  } catch (error) {
    if (error instanceof HttpError) {
      handleError(error.message)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}

// Metodo para mostrar alertas de error
function handleError(message: string) {
  messageForError.value = message
  showMessageErro.value = true
}
// Metodo para remover alertas de erro
function removeAlertError() {
  showMessageErro.value = false
}
// Metodo para remover alertas
function removeAlert() {
  showMessageAlert.value = false
}
getLocalStorage()
getDataToDashboard()
</script>

<template>
  <div>
    <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
    <div class="w-full border shadow-lg rounded-md p-4 my-7">
      <Card>
        <template v-slot:qtdProducts>
          {{ dataToDashboard.totalProduct }}
        </template>
        <template v-slot:averageProfit>
          {{ dataToDashboard.averageProfit ? dataToDashboard.averageProfit.toFixed(2) : 0 }}
        </template>
      </Card>
    </div>
  </div>
</template>
