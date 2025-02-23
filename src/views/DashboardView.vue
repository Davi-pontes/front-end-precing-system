<script setup lang="ts">
import axios, { AxiosError } from 'axios'
import type { ICategoryWithProducts } from '@/interface/Category'
import { ref } from 'vue'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import { HttpGetCategory } from '@/http/category/get-category'
import type { IProduct } from '@/interface/Product'
import Card from '@/components/Card.vue'
import { getUserDataLocalStorage } from '@/composables/getUserData'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const messageForError = ref('')
const showMessageErro = ref(false)
const messageForAlert = ref('')
const showMessageAlert = ref(false)
const allCategoryAndProducts = ref<ICategoryWithProducts>({
  category: [],
  products: [],
  totalProducts: 0,
  averageProfit: 0
})
const productToRender = ref<IProduct[]>([])
const nameUser = ref('')
const idUser = ref('')

const httpGetCategory = new HttpGetCategory(axios, urlApiBackEnd)

function getLocalStorage(): void {
  try {
    const userData = getUserDataLocalStorage()

    nameUser.value = userData.name
    idUser.value = userData.id
  } catch (error) {
    console.error('Erro ao carregar dados do localStorage:')
  }
}
async function getAllCategoryAndProduct(): Promise<void> {
  try {
    const data = await httpGetCategory.getAllCategoryAndProduct(idUser.value)

    if (data) {
      allCategoryAndProducts.value = data
      productToRender.value = allCategoryAndProducts.value.products
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
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
getAllCategoryAndProduct()
</script>

<template>
  <div>
    <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
    <div class="w-full border shadow-lg rounded-md p-4 my-7">
      <Card>
        <template v-slot:qtdProducts>
          {{ allCategoryAndProducts.totalProducts }}
        </template>
        <template v-slot:averageProfit>
          {{ allCategoryAndProducts.averageProfit ? allCategoryAndProducts.averageProfit.toFixed(2) : 0 }}
        </template>
      </Card>
    </div>
  </div>
</template>
