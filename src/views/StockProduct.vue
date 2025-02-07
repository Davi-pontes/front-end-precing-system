<script setup lang="ts">
import axios, { AxiosError } from 'axios'
import TableComponent from '@/components/Table.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { columnsStockProduct } from '@/components/ColumnsStockProduct'
import type { IStockProduct } from '@/interface/Stock'
import type { IProduct } from '@/interface/Product'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import Combobox from '@/components/Combobox.vue'
import { Button } from '@/components/ui/button'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import type { ICommandItem } from '@/interface/Combobox'
const urlComunicationBackEnd = import.meta.env.VITE_API_BACKEND

const route = useRoute()
const idUser = route.query.id
const allProductStockByUser = ref<IStockProduct[]>([])
const allUserProducts = ref<IProduct[]>([])
const selectedProduct = ref('')
const itemSelected = ref<ICommandItem>()
const dataFormatedToComboBox = ref<ICommandItem[]>([])
const inputUpdateStock = ref(0)
const messageForAlert = ref('')
const showMessageAlert = ref(false)
const messageErro = ref('')
const showError = ref(false)

function handleAlert(message: string) {
  messageForAlert.value = message
  showMessageAlert.value = true
}
// Função para remover alertas
function removeAlert() {
  showMessageAlert.value = false
}

function handleError(message: string) {
  messageErro.value = message
  showError.value = true
}
function handleRemoveAlertError() {
  showError.value = false
  messageErro.value = ''
}
async function getStockAllProductByIdUser() {
  try {
    const { data } = await axios.get(urlComunicationBackEnd + '/stock', {
      params: { idUser },
      withCredentials: true
    })
    allProductStockByUser.value = data

    formatedDataToCombobox(allUserProducts.value)
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
async function getAllProductByIdUser() {
  try {
    const { data } = await axios.get(urlComunicationBackEnd + '/product', {
      params: { idUser },
      withCredentials: true
    })
    allUserProducts.value = data.allProducts
    
    formatedDataToCombobox(allUserProducts.value)
  } catch (error) {
    console.log(error);
    
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
function formatedDataToCombobox(data: IProduct[]) {
  dataFormatedToComboBox.value = data.map((item: any) => {
    return { value: item.id_product, label: item.name }
  })
}
function handleItemSelected(item: ICommandItem) {
  const stockProduct = allProductStockByUser.value.find((it) => it.id_product === item.value)

  if (stockProduct) inputUpdateStock.value = stockProduct.quantity

  selectedProduct.value = item.label
  itemSelected.value = item
}
function handleClickUpdate() {
  const stockProduct = allProductStockByUser.value.find(
    (it) => it.id_product === itemSelected.value?.value
  )

  if (stockProduct && stockProduct.quantity < inputUpdateStock.value) {
    const numberToIncrement = inputUpdateStock.value - stockProduct.quantity
    handleIncrement(numberToIncrement, stockProduct.id_stock)
  } else if (stockProduct && stockProduct.quantity > inputUpdateStock.value) {
    const numberToDecrement = stockProduct.quantity - inputUpdateStock.value
    handleDecrement(numberToDecrement, stockProduct.id_stock)
  } else {
    handleError('Altere a quantidade.')
  }
}
async function handleIncrement(quantity: number, id_stock: number) {
  try {
    const { data } = await axios.post(urlComunicationBackEnd + '/stock/entry', {
      quantity: quantity,
      id_stock: id_stock
    },
      { withCredentials: true }
    )
    handleAlert('Estoque atualizado com sucesso!')
    updatedValue(data)
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
async function handleDecrement(quantity: number, id_stock: number) {
  try {
    const { data } = await axios.post(urlComunicationBackEnd + '/stock/output', {
      quantity: quantity,
      id_stock: id_stock
    })
    handleAlert('Estoque atualizado com sucesso!')
    updatedValue(data)
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
function updatedValue(item: any) {
  allProductStockByUser.value = allProductStockByUser.value.map((it) =>
    it.id_product === item.id_product
      ? { ...it, quantity: item.quantity, updated_at: item.updated_at }
      : it
  )
}
getStockAllProductByIdUser()
getAllProductByIdUser()
</script>

<template>
  <MessageAlert v-if="showMessageAlert" :message="messageForAlert"
    @removeAlert="removeAlert" />
  <MessageError v-if="showError" :message="messageErro" @removeAlert="handleRemoveAlertError" />
  <div class="flex flex-col w-full h-full">
    <div class="w-[70%] h-[8em] border shadow-lg rounded-md p-4">
      <span class="font-medium text-xl">Atualize o estoque.</span>
      <div class="flex w-full h-[3em] gap-4 mt-4">
        <Combobox :titleInput="'Selecione um produto...'" :titleSearch="'Pesquise um produto...'"
          :items="dataFormatedToComboBox" v-model="selectedProduct" @itemSelected="handleItemSelected" />
        <div>
          <NumberField v-model="inputUpdateStock" :min="0" class="border-none">
            <NumberFieldContent class="border rounded-md">
              <NumberFieldDecrement class="border-none" />
              <NumberFieldInput class="border-none" />
              <NumberFieldIncrement class="border-none" />
            </NumberFieldContent>
          </NumberField>
        </div>
        <Button class="bg-[#8095c7]" @click="handleClickUpdate">Atualizar</Button>
      </div>
    </div>
    <div class="border shadow-lg rounded-md p-4 mt-7">
      <TableComponent :columns="columnsStockProduct" :data-props="allProductStockByUser"
        :informations-input-search="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }">
      </TableComponent>
    </div>
  </div>
</template>
