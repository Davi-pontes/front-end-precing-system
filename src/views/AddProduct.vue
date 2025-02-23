<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import { useRoute } from 'vue-router'
import Combobox from '@/components/Combobox.vue'
import type { ICommandItem } from '@/interface/Combobox'
import { Button } from '@/components/ui/button'
// import { FileUp } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import InputNumber from '@/components/InputNumber.vue'
import InputCurrency from '@/components/InputCurrency.vue'
import InputPercentage from '@/components/InputPercentage.vue'
import { HttpGetProduct } from '@/http/product/get-product'
import { HttpError } from '@/errors/errorsHttp'
import { HttpGetCategory } from '@/http/category/get-category'
import { HttpCreateProduct } from '@/http/product/create-product'
import { HttpUpdateProduct } from '@/http/product/update-product'
import { HttpCalculation } from '@/http/calculation/calculation'
import type { IBasesCalculation } from '@/interface/Calculation'
import { getUserIdLocalStorage } from '@/composables/getUserId'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const route = useRoute()

const httpGetProduct = new HttpGetProduct(axios, urlApiBackEnd)
const httpPostProduct = new HttpCreateProduct(axios, urlApiBackEnd)
const httpPutProduct = new HttpUpdateProduct(axios, urlApiBackEnd)
const httpGetCategory = new HttpGetCategory(axios, urlApiBackEnd)
const httpCalculation = new HttpCalculation(axios, urlApiBackEnd)

const idProduct = route.query?.idP

// Variáveis reativas
const idCategory = ref('')
const dataFormatedToComboBox = ref<ICommandItem[]>([])
const selectedCategory = ref('')
const showMessageAlert = ref(false)
const showMessageErro = ref(false)
const sellingPriceAdded = ref(false)
const messageForAlert = ref('')
const messageForError = ref('')
const basesCalculation = ref<IBasesCalculation>({
  tax: 0,
  fixedCost: 0,
  freigth: 0,
  qtyInBox: 1,
  profitPercentage: 0,
  priceProduct: 0,
  sellingPrice: 0
})
const resultCalculation = ref({
  profit: 0,
  pricePerUnit: 0,
  costProduct: 0,
  priceWithProfit: 0
})
const datasProduct = ref({
  nameProduct: '',
  descriptionProduct: null,
  idCategory: idCategory.value,
  qtdStock: 0,
  only: true
})

// Função para mostrar alertas
function handleAlert(message: string) {
  messageForAlert.value = message
  showMessageAlert.value = true
}
// Função para mostrar alertas de error
function handleError(message: string) {
  messageForError.value = message
  showMessageErro.value = true
}

// Função para remover alertas
function removeAlert() {
  showMessageAlert.value = false
}
// Função para remover alertas de erro
function removeAlertError() {
  showMessageErro.value = false
}
async function handleSendDatasToBackend() {
  if (idProduct) {
    sendDataToUpdate()
  } else {
    sendDatasForDataBase()
  }
}
// Função para buscar todas categoria do usuario
async function getCategoryData() {
  try {
    const data = await httpGetCategory.getAllCategory(idUser as string)
    formatedDataToCombobox(data)
  } catch (error) {
    if (error instanceof HttpError) {
      handleError(error.message)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
//Formatador de dados para ficar de acordo com especificação combobox
function formatedDataToCombobox(data: any) {
  dataFormatedToComboBox.value = data.map((item: any) => {
    return { value: item.id, label: item.name }
  })
}
//Função de tratamento para dado selecionado no combobox
function handleItemSelected(item: ICommandItem) {
  idCategory.value = item.value as string
  datasProduct.value.idCategory = item.value as string
}
// Função para buscar dados do produto específico
async function getProductData() {
  try {
    const data = await httpGetProduct.getSpecificProduct(idProduct as string)
    basesCalculation.value = {
      fixedCost: data.fixed_cost,
      freigth: data.freight,
      priceProduct: data.final_recipe_price,
      profitPercentage: data.profit_percentage,
      qtyInBox: data.qtd_box,
      tax: data.tax,
      sellingPrice: 0

    }

    resultCalculation.value = {
      costProduct: data.revenue_cost,
      pricePerUnit: data.price_per_unit,
      profit: data.profit,
      priceWithProfit: data.price_per_unit
    }

    datasProduct.value = {
      nameProduct: data.name,
      descriptionProduct: data.description,
      idCategory: data.id_category,
      qtdStock: data.qtdStock,
      only: true
    }

    const productCategory = dataFormatedToComboBox.value.find((it) => it.value === data.id_category)
    
    if (productCategory) {
      selectedCategory.value = productCategory.label
      idCategory.value = productCategory.value as string
    }
  } catch (error) {
    if (error instanceof HttpError) {
      handleError(error.message)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
function formateDatasToSendService() {
  return {
    nameProduct: datasProduct.value.nameProduct,
    priceProduct: basesCalculation.value.priceProduct,
    descriptionProduct: datasProduct.value.descriptionProduct,
    qtdInBox: basesCalculation.value.qtyInBox,
    tax: basesCalculation.value.tax,
    freigth: basesCalculation.value.freigth,
    fixedCost: basesCalculation.value.fixedCost,
    pricePerUnit: resultCalculation.value.priceWithProfit,
    profitPecentage: basesCalculation.value.profitPercentage,
    costProduct: resultCalculation.value.costProduct,
    profit: resultCalculation.value.profit,
    idCategory: idCategory.value,
    qtdStock: datasProduct.value.qtdStock,
    only: true
  }
}
// Função para enviar dados ao backend
async function sendDatasForDataBase() {
  try {
    if (!idCategory.value || idCategory.value === '') {
      handleError('Selecione uma categoria.')
      return
    }
    const datasToSend = formateDatasToSendService()
    const data = await httpPostProduct.createOnlyProduct(datasToSend)

    if (data) handleAlert('Produto adicionado com sucesso!')
    clearDatas()
  } catch (error: any) {
    if (error instanceof HttpError) {
      handleError(error.message)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
async function sendDataToUpdate() {
  try {
    if (!idCategory.value || idCategory.value === '') {
      handleError('Selecione uma categoria.')
      return
    }
    const datasToSend = formateDatasToSendService()
    const data = await httpPutProduct.updateOnlyProduct(datasToSend, idProduct as string)

    if (data) handleAlert('Produto alterado com sucesso!')

    clearDatas()
  } catch (error: any) {
    if (error instanceof HttpError) {
      handleError(error.message)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
// Função para atualizar números
async function updateAllNumbers() {
  try {
    const data = await httpCalculation.calculationDatasProduct(basesCalculation.value)

    if (sellingPriceAdded.value) basesCalculation.value.profitPercentage = data.profitPercentage

    resultCalculation.value = data

  } catch (error) {
    if (error instanceof HttpError) {
      handleError(error.message)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
// Função para limpar os dados
function clearDatas() {
  datasProduct.value = {
    nameProduct: '',
    descriptionProduct: null,
    idCategory: idCategory.value,
    qtdStock: 0,
    only: true
  }
  basesCalculation.value = {
    tax: 0,
    fixedCost: 0,
    freigth: 0,
    qtyInBox: 1,
    profitPercentage: 0,
    priceProduct: 0,
    sellingPrice: 0
  }
  resultCalculation.value = {
    profit: 0,
    pricePerUnit: 0,
    costProduct: 0,
    priceWithProfit: 0
  }
}

function handleCalculateProfit() {
  updateAllNumbers()
}
function handleCalculateSellingPrice() {
  sellingPriceAdded.value = true
  updateAllNumbers()
}

const idUser = getUserIdLocalStorage()
getCategoryData()
if (idProduct) {
  getProductData()
}
</script>

<template>
  <main>
    <div class="flex w-full gap-2">
      <div class="bg-white w-[60vw] h-[28em] border rounded-md shadow-sm">
        <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
        <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
        <!-- Conteúdo principal -->
        <div class="flex flex-col w-[95%] h-[85%] mx-auto mt-2">
          <div class="flex flex-col gap-2">
            <span class="font-medium text-xl">Selecione a categoria do seu produto.</span>
            <div class="flex justify-between">
              <Combobox :titleInput="'Selecione uma categoria...'" :titleSearch="'Pesquise por uma categoria...'"
                :items="dataFormatedToComboBox" v-model="selectedCategory" @itemSelected="handleItemSelected" />
              <!-- <label for="file-upload"
                class="cursor-pointer flex items-center space-x-2 w-[30%] bg-muted text-white rounded px-4 py-2">
                <FileUp />
                <span>Exporta planilha</span>
              </label> -->
              <Input id="file-upload" class="hidden" type="file" />
            </div>
          </div>
          <div class="flex w-full h-full gap-4">
            <!-- Primeira coluna -->
            <div class="flex flex-col w-1/2">
              <label for="name" class="mt-6">Nome do produto*</label>
              <input type="text" placeholder="Nome do produto" id="name" class="border-2 outline-none rounded-md mb-4"
                v-model="datasProduct.nameProduct" />
              <label for="description">Descrição</label>
              <textarea name="description" id="description" class="w-full h-20 rounded-md border-2"
                v-model="datasProduct.descriptionProduct"></textarea>
            </div>
            <!-- Segunda coluna -->
            <div class="flex items-center h-full flex-col w-1/2">
              <div class="flex w-[95%] h-full gap-4">
                <!-- Primeiro bloco interno -->
                <div class="flex justify-between flex-col w-1/2 mt-6">
                  <label for="qtyInBox">Quantidade em caixa *</label>
                  <InputNumber v-model="basesCalculation.qtyInBox" @update="updateAllNumbers" id="qtyInBox" />

                  <label for="tax">Taxa</label>
                  <InputCurrency id="tax" v-model="basesCalculation.tax" @change="updateAllNumbers" />

                  <label for="freight">Frete</label>
                  <InputCurrency v-model="basesCalculation.freigth" @change="updateAllNumbers" id="freight" />
                  <label for="qtyStock">Quantidade em estoque</label>
                  <InputNumber v-model="datasProduct.qtdStock" @change="updateAllNumbers" id="qtyStock" />
                </div>
                <!-- Segundo bloco interno -->
                <div class="flex justify-between flex-col w-1/2 mt-6">
                  <label for="pricePurchase">Preço de compra *</label>
                  <InputCurrency placeholder="1" v-model="basesCalculation.priceProduct" @change="updateAllNumbers"
                    id="pricePurchase" />

                  <label for="operationalCost">Custo operacional</label>
                  <InputCurrency id="operationalCost" v-model="basesCalculation.fixedCost" @change="updateAllNumbers" />

                  <label for="profitPercentage">Porcentagem de lucro *</label>
                  <InputPercentage id="profitPercentage" v-model="basesCalculation.profitPercentage"
                    @change="handleCalculateProfit" :disabled="resultCalculation.costProduct === 0" />

                  <label for="pricePerUnit">Preço de venda</label>
                  <InputCurrency id="stock" v-model="basesCalculation.sellingPrice"
                    @change="handleCalculateSellingPrice" :disabled="resultCalculation.costProduct === 0" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Botão de salvar -->
        <div class="flex justify-end w-[95%] mx-auto mt-3">
          <Button class="bg-muted" @click="handleSendDatasToBackend()">SALVAR PRODUTO</Button>
        </div>
      </div>
      <!-- Resumo do produto -->
      <div class="flex flex-col w-[20%] h-[17em] border shadow-lg bg-gray-200 rounded-md p-4">
        <span class="text-lg mb-2">Resumo do produto</span>

        <div class="w-full h-[1px] bg-slate-400"></div>

        <div class="flex flex-col w-full gap-y-2">
          <div class="flex justify-between">
            <span class="opacity-40">Custo</span>
            <span>R$ {{ resultCalculation.costProduct.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="opacity-40">Lucro</span>
            <span>R$ {{ resultCalculation.profit.toFixed(2) }}</span>
          </div>
          <div class="w-full h-[1px] bg-slate-400"></div>
          <div class="flex justify-between">
            <span class="opacity-40">Preço da unidade</span>
            <span>R$ {{ resultCalculation.priceWithProfit.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
