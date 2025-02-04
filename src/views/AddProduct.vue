<script lang="ts" setup>
import { ref, watch } from 'vue'
import axios, { AxiosError } from 'axios'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import { useRoute } from 'vue-router'
import Combobox from '@/components/Combobox.vue'
import type { ICommandItem } from '@/interface/Combobox'
import { Button } from '@/components/ui/button'
import { FileUp } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import InputNumber from '@/components/InputNumber.vue'
import InputCurrency from '@/components/InputCurrency.vue'
import InputPercentage from '@/components/InputPercentage.vue'
const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const route = useRoute()

const idUser = route.query.id
const idProduct = route.query?.idP

// Variáveis reativas
const idCategory = ref('')
const dataFormatedToComboBox = ref<ICommandItem[]>([])
const selectedCategory = ref('')
const showMessageAlert = ref(false)
const showMessageErro = ref(false)
const profitPercentageAdded = ref(false)
const sellingPriceAdded = ref(false)
const sellingPrice = ref(0)
const messageForAlert = ref('')
const messageForError = ref('')
const costProductDisplay = ref('0.00')
const profitDisplay = ref('0.00')
const pricePerUnitDisplay = ref('0.00')
const datasProduct = ref({
  nameProduct: '',
  priceProduct: 0,
  descriptionProduct: null,
  qtdInBox: 1,
  tax: 0,
  freigth: 0,
  fixedCost: 0,
  pricePerUnit: 0,
  profitPecentage: 0,
  costProduct: 0,
  profit: 0,
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
    const { data } = await axios.get(urlApiBackEnd + '/category/only', {
      params: { idUser: idUser },
      withCredentials: true
    })
    formatedDataToCombobox(data)
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
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
    const { data } = await axios.get(urlApiBackEnd + '/product/specific', {
      params: { id: idProduct },
      withCredentials: true
    })
    datasProduct.value = {
      nameProduct: data.name,
      priceProduct: data.final_recipe_price,
      descriptionProduct: data.description,
      qtdInBox: data.qtd_box,
      tax: data.tax,
      freigth: data.freight,
      fixedCost: data.fixed_cost,
      pricePerUnit: data.price_per_unit,
      profitPecentage: data.profit_percentage,
      costProduct: data.revenue_cost,
      profit: data.profit,
      idCategory: data.id_category,
      qtdStock: data.qtdStock,
      only: true
    }
    const productCategory = dataFormatedToComboBox.value.find((it) => it.value === data.id_category)

    if (productCategory) selectedCategory.value = productCategory.label
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
// Função para enviar dados ao backend
async function sendDatasForDataBase() {
  try {
    if (!idCategory.value || idCategory.value === '') {
      handleError('Selecione uma categoria.')
      return
    }
    const { data } = await axios.post(urlApiBackEnd + '/product/only', datasProduct.value, { withCredentials: true })

    if (data) handleAlert('Produto adicionado com sucesso!')
    clearDatas()
  } catch (error: any) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
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
    const { data } = await axios.put(urlApiBackEnd + '/product/only', datasProduct.value, {
      params: {
        id: idProduct
      },
      withCredentials: true
    })

    if (data) handleAlert('Produto alterado com sucesso!')

    clearDatas()
  } catch (error: any) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
// Função para calcular o preço de cada produto
function calculatePricePerUnit() {
  let calculatePricePerUnit = datasProduct.value.costProduct /
    datasProduct.value.qtdInBox
  
  pricePerUnitDisplay.value = calculatePricePerUnit.toFixed(2)
}
// Função para calcular o custo
function calculateTotalCost() {
  datasProduct.value.costProduct =
    datasProduct.value.tax +
    datasProduct.value.fixedCost +
    datasProduct.value.freigth +
    datasProduct.value.priceProduct
}
function calculatePricePerUnitPlusProfit() {
  let calculatePricePerUnit = (datasProduct.value.costProduct + datasProduct.value.profit) /
    datasProduct.value.qtdInBox
  
  pricePerUnitDisplay.value = calculatePricePerUnit.toFixed(2)
}
// Função para calcular o lucro
function calculateProfit() {
  datasProduct.value.profit =
    (datasProduct.value.costProduct * (datasProduct.value.profitPecentage * 100)) / 100
    let calculatePricePerUnit = datasProduct.value.costProduct /
    datasProduct.value.qtdInBox

    calculatePricePerUnit += datasProduct.value.profit
  
  pricePerUnitDisplay.value = calculatePricePerUnit.toFixed(2)
  
}
// Função para atualizar números
function updateAllNumbers(method:string | null) {
  if(method === 'profit' || profitPercentageAdded.value){
    console.log(method);
    console.log('profit');
    profitPercentageAdded.value = true
    calculateTotalCost()
    calculateProfit()
    calculatePricePerUnitPlusProfit()
  } else{
    console.log('normal');
    calculateTotalCost()
    calculatePricePerUnit()
  }
}
// Função para limpar os dados
function clearDatas() {
  datasProduct.value = {
    nameProduct: '',
    priceProduct: 0,
    descriptionProduct: null,
    qtdInBox: 1,
    tax: 0,
    freigth: 0,
    fixedCost: 0,
    pricePerUnit: 0,
    profitPecentage: 0,
    costProduct: 0,
    profit: 0,
    idCategory: idCategory.value,
    qtdStock: 0,
    only: true
  }
}
function calculateprofitPercentage() {

  const absoluteProfit = Math.abs(datasProduct.value.costProduct - sellingPrice.value)

  const profitPercentage = (absoluteProfit / datasProduct.value.costProduct)

  datasProduct.value.profitPecentage = parseFloat(profitPercentage.toFixed(2))
}
function handleCalculateProfit() {
  updateAllNumbers('profit')
  //calculateprofitPercentage()
}
function handleCalculateSellingPrice(){
  sellingPriceAdded.value = true
  calculateprofitPercentage()
}
//Atualiza o resumo a cada alteração
watch(() => datasProduct.value, () => {
  costProductDisplay.value = datasProduct.value.costProduct.toFixed(2)
  profitDisplay.value = datasProduct.value.profit.toFixed(2)
}, { deep: true })
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
              <label for="file-upload"
                class="cursor-pointer flex items-center space-x-2 w-[30%] bg-muted text-white rounded px-4 py-2">
                <FileUp />
                <span>Exporta planilha</span>
              </label>
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
                  <label for="qtdInBox">Quantidade em caixa *</label>
                  <InputNumber v-model="datasProduct.qtdInBox" @update="updateAllNumbers" id="qtdInBox" />

                  <label for="tax">Imposto</label>
                  <InputCurrency id="tax" v-model="datasProduct.tax" @update="updateAllNumbers" />

                  <label for="freight">Frete</label>
                  <InputCurrency v-model="datasProduct.freigth" @update="updateAllNumbers" id="freight" />
                  <label for="qtyStock">Quantidade em estoque</label>
                  <InputNumber v-model="datasProduct.qtdStock" @update="updateAllNumbers" id="qtyStock" />
                </div>
                <!-- Segundo bloco interno -->
                <div class="flex justify-between flex-col w-1/2 mt-6">
                  <label for="pricePurchase">Preço de compra *</label>
                  <InputCurrency placeholder="1" v-model="datasProduct.priceProduct" @update="updateAllNumbers"
                    id="pricePurchase" />

                  <label for="operationalCost">Custo operacional</label>
                  <InputCurrency id="operationalCost" v-model="datasProduct.fixedCost" @update="updateAllNumbers" />

                  <label for="profitPecentage">Porcentagem de lucro *</label>
                  <InputPercentage id="profitPecentage" v-model="datasProduct.profitPecentage"
                    @update="handleCalculateProfit" 
                    :disabled="datasProduct.costProduct === 0"/>

                  <label for="pricePerUnit">Preço de venda</label>
                  <InputCurrency id="stock" v-model="sellingPrice" @update="handleCalculateSellingPrice"
                  :disabled="datasProduct.costProduct === 0"/>
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
            <span>R$ {{ costProductDisplay }}</span>
          </div>
          <div class="flex justify-between">
            <span class="opacity-40">Lucro</span>
            <span>R$ {{ profitDisplay }}</span>
          </div>
          <div class="w-full h-[1px] bg-slate-400"></div>
          <div class="flex justify-between">
            <span class="opacity-40">Preço da unidade</span>
            <span>R$ {{ pricePerUnitDisplay }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
