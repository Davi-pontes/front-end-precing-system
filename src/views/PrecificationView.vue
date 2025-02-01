<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'
import type { LocationQueryValue } from 'vue-router'
import MessageAlert from '@/components/MessageAlert.vue'
import Loading from '@/components/animations/Loading.vue'
import Combobox from '@/components/Combobox.vue'
import { HttpGetCategory } from '@/http/category/get-category'
import MessageError from '@/components/MessageError.vue'
import { Input } from '@/components/ui/input'
import SelectBoolean from '@/components/SelectBoolean.vue'
import { Button } from '@/components/ui/button'
import InputCurrency from '@/components/InputCurrency.vue'
import InputNumber from '@/components/InputNumber.vue'
import InputPercentage from '@/components/InputPercentage.vue'
import { CircleX } from 'lucide-vue-next';
import type { IProductIngredient } from '@/interface/Ingredient'
import type { IProduct, IProductRender } from '@/interface/Product'
import { HttpGetProduct } from '@/http/product/get-product'
import { UtilsFormateProduct } from '@/utils/formate-product'
import { HttpCreateProduct } from '@/http/product/create-product'
import { HttpUpdateProduct } from '@/http/product/update-product'
import { HttpGetProductIngredient } from '@/http/productIngredient/get-productIngredient'
import { HttpGetProductJoker } from '@/http/productJoker/get-productJoker'
import type { ICategory } from '@/interface/Category'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const route = useRoute()
const router = useRouter()

const httpGetProduct = new HttpGetProduct(axios, urlApiBackEnd)
const httpGetCategory = new HttpGetCategory(axios, urlApiBackEnd)
const httpGetProductJoker = new HttpGetProductJoker(axios, urlApiBackEnd)
const httpGetProductIngredient = new HttpGetProductIngredient(axios, urlApiBackEnd)
const httpCreateProduct = new HttpCreateProduct(axios, urlApiBackEnd)
const httpUpdateProduct = new HttpUpdateProduct(axios, urlApiBackEnd)

const dataProduct = ref<IProductRender>({
  nameProduct: '',
  income: 1,
  recipeTime: 0,
  operationalCost: 0,
  profitPecentage: 0,
  isJoker: '0',
  costOfAllIngredients: 0,
  fixedCost: 0,
  profit: 0,
  priceFinalRevenue: 0,
  pricePerUnit: 0,
  costOfRevenue: 0,
  labor: 0
});


const id_product = ref<string | null>(null)
const id_category = ref<string | null>(null)
const allProductIngredient = ref<IProductIngredient[]>([{
  name: '',
  weight: 0,
  unit1: 'GRAMAS',
  price: 0,
  quantity: 0,
  ingredient_cost: 0
}])
const productsJoker = ref<IProduct[]>([])
const productJokerSelected = ref<IProduct>({} as IProduct)
const idUser = ref<LocationQueryValue | LocationQueryValue[]>(null)
const allCategories = ref<ICategory[]>([])
const showMessage = ref(false)
const message = ref('')
const thereWasChanged = ref(false)
const showLoading = ref(false)
const dataFormatedToComboBox = ref([])
const selectedCategory = ref('')
const messageForError = ref('')
const showMessageErro = ref(false)

onMounted(async () => {
  showLoading.value = true
  await getQuery()
  await controllerCreated()
  showLoading.value = false
})

async function getQuery() {
  idUser.value = route.query.idU
}

async function controllerCreated() {
  if (route.query.idP) {
    getQueryIdProduct()
    getQueryIdCategory()
    await getCategory()
    await getProduct()
    await getProductIngredient()
    await getProducsJoker()
  } else {
    getQueryIdCategory()
    await getProducsJoker()
    await getCategory()
  }
}

function updateAllNumbers(functionThatCalled: boolean) {
  if (id_product.value && !functionThatCalled) thereWasChanged.value = true
  calculatecostOfAllIngredients()
  calculateCostFixed()
  calculateProfit()
  calculateFinalRevenuePrice()
  calculatePricePerUnit()
  calculateCostOfRevenue()
}

function calculatecostOfAllIngredients(): void {
  if (allProductIngredient.value) {
    const totalCost = allProductIngredient.value.reduce((acc, data) => acc + data.ingredient_cost, 0)
    dataProduct.value.costOfAllIngredients = parseFloat(totalCost.toFixed(2))
  }
}

function calculateCostFixed(): void {
  if (dataProduct.value.operationalCost === 0) {
    return
  }
  const result = (dataProduct.value.costOfAllIngredients * dataProduct.value.operationalCost) / 100
  dataProduct.value.fixedCost = parseFloat(result.toFixed(2))
}

function calculateProfit(): void {
  const resultCalculateProfit =
    ((dataProduct.value.costOfAllIngredients + dataProduct.value.fixedCost) * (dataProduct.value.profitPecentage * 100)) / 100
  dataProduct.value.profit = parseFloat(resultCalculateProfit.toFixed(2))
}

function calculateFinalRevenuePrice(): void {
  const resultCalculatepriceFinalRevenue =
    dataProduct.value.costOfAllIngredients + dataProduct.value.fixedCost + dataProduct.value.profit
  dataProduct.value.priceFinalRevenue = parseFloat(resultCalculatepriceFinalRevenue.toFixed(2))
}

function calculatePricePerUnit(): void {
  const resultCalculatePricePerUnit = dataProduct.value.priceFinalRevenue / dataProduct.value.income
  dataProduct.value.pricePerUnit = parseFloat(resultCalculatePricePerUnit.toFixed(2))
}

function calculateCostOfRevenue(): void {
  const resultCalculateCostOfRevenue = dataProduct.value.costOfAllIngredients + dataProduct.value.fixedCost
  dataProduct.value.costOfRevenue = parseFloat(resultCalculateCostOfRevenue.toFixed(2))
}

function calculateCostOfAnIngredient(index: number): void {
  if (id_product.value) thereWasChanged.value = true

  const resultvalidate = validateIfThereIsANumber0(index)

  if (resultvalidate) {
    allProductIngredient.value[index].ingredient_cost = 0
    updateAllNumbers(true)
  } else {
    const updateingredientCost =
      (allProductIngredient.value[index].quantity * allProductIngredient.value[index].price) / allProductIngredient.value[index].weight
    allProductIngredient.value[index].ingredient_cost = parseFloat(updateingredientCost.toFixed(2))
    updateAllNumbers(true)
  }
}

function addProductJoker(): void {
  const ingredient_cost =
    productJokerSelected.value.revenue_cost / productJokerSelected.value.income
  const ingredientCostFormated = parseFloat(ingredient_cost.toFixed(2))
  const addProductJoker = {
    name: productJokerSelected.value.name,
    weight: productJokerSelected.value.income,
    unit1: 'GRAMAS',
    price: productJokerSelected.value.revenue_cost,
    quantity: 1,
    ingredient_cost: ingredientCostFormated
  }
  allProductIngredient.value.push(addProductJoker)
  updateAllNumbers(true)
}
function addNewIngredient(): void {
  if (id_product.value) thereWasChanged.value = true
  const newIngredient = {
    name: '',
    weight: 0,
    unit1: 'GRAMAS',
    price: 0,
    quantity: 0,
    ingredient_cost: 0
  }
  allProductIngredient.value.push(newIngredient)
}
function deleteIngredientOfArray(index: number) {
  allProductIngredient.value.splice(index, 1)
  updateAllNumbers(true)
}
function validateIfThereIsANumber0(index: number) {
  const validate = Object.entries(allProductIngredient.value[index]).some(
    ([key, value]) => typeof value === 'number' && value === 0 && key != 'ingredient_cost'
  )
  return validate
}

function prepareData() {
  const productDataAssembly = UtilsFormateProduct.formatedProductDataToSend(dataProduct.value)

  productDataAssembly.id_category = id_category.value

  const dataAssembly = {
    productInformation: productDataAssembly,
    productIngredients: allProductIngredient.value
  }
  return dataAssembly
}

function sendDataToTheBackend(): void {
  const dataFormated = prepareData()
  if (thereWasChanged.value && id_product.value) {
    sendUpdateData(dataFormated, id_product.value)
  } else {
    sendNewData(dataFormated)
  }
}

function removeAlertError() {
  showMessageErro.value = false
}

function handleError(message: string) {
  messageForError.value = message
  showMessageErro.value = true
}

async function sendNewData(data: any) {
  try {
    if (!data.productInformation.id_category) {
      handleError('Selecione uma categoria.')
      return
    }
    await httpCreateProduct.createProduct(data)
    returnToHomePage()
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Estamos com problema no momento por favor tente mais tarde!')
    }
  }
}

async function sendUpdateData(data: object, id_product: string): Promise<void> {
  try {
    await httpUpdateProduct.updateProduct(data, id_product)
    returnToHomePage()
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Estamos com problema no momento por favor tente mais tarde!')
    }
  }
}

function getQueryIdProduct(): void {
  id_product.value = route.query.idP as string
}

function getQueryIdCategory(): void {
  id_category.value = route.query.idC as string
}

async function getProduct() {
  if (id_product.value) {
    try {
      const productSpecific = await httpGetProduct.getSpecificProduct(id_product.value)

      dataProduct.value = UtilsFormateProduct.formateSpecificProduct(productSpecific)

      categoryAlreadySelected(productSpecific.id_category)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        handleError(error.response?.data)
      } else {
        handleError('Estamos com problema no momento por favor tente mais tarde!')
      }
    }
  }

}

async function getProductIngredient() {
  try {
    if (id_product.value) {
      const productIngredient = await httpGetProductIngredient.getProductIngredient(id_product.value)
      allProductIngredient.value = productIngredient
      //updateAllNumbers(true)
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Estamos com problema no momento por favor tente mais tarde!')
    }
  }
}

async function getProducsJoker() {
  try {
    if (idUser.value) {
      const result = await httpGetProductJoker.getProductJoker(idUser.value as string)

      productsJoker.value = result
    }
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Estamos com problema no momento por favor tente mais tarde!')
    }
  }
}
async function getCategory() {
  if (idUser.value) {
    const data = await httpGetCategory.getAllCategory(idUser.value as string)
    allCategories.value = data
    formatedDataToCombobox(allCategories.value)
  }
}

function categoryAlreadySelected(idCategory: string) {
  const categorySelected = allCategories.value.find(category => category.id === idCategory)
  if (categorySelected) selectedCategory.value = categorySelected.name
}
function formatedDataToCombobox(data: any) {
  dataFormatedToComboBox.value = data.map((item: any) => {
    return { value: item.id, label: item.name }
  })
}

function handleItemSelected(item: any) {
  id_category.value = item.value as string
  selectedCategory.value = item.label
}
function handleButtonToGoBack() {
  returnToHomePage()
}
function returnToHomePage() {
  router.push({ path: 'home' })
}

function updateNameProduct() {
  if (id_product.value) thereWasChanged.value = true
}
</script>
<template>
  <div class="flex flex-col w-full h-full">
    <Loading v-if="showLoading" />
    <MessageAlert :message="message" v-if="showMessage"></MessageAlert>
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
    <div class="flex items-center h-20 bg-muted gap-4 px-4">
      <div class="flex-1">
        <Input class="bg-white w-full" name="nameProduct" type="text" v-model="dataProduct.nameProduct"
          @change="updateNameProduct" placeholder="Nome do produto" />
      </div>
      <div class="flex-1">
        <Combobox :titleInput="'Selecione uma categoria...'" :titleSearch="'Pesquise por uma categoria...'"
          :items="dataFormatedToComboBox" name="selectedCategory" v-model="selectedCategory"
          @itemSelected="handleItemSelected" />
      </div>
      <div class="flex-1">
        <SelectBoolean v-model="dataProduct.isJoker" />
      </div>
    </div>
    <div class="w-full h-[30em] overflow-y-auto shadow-md">
      <table class="w-full bg-white">
        <!-- Cabeçalho da tabela -->
        <thead class="bg-[#5A6FA5] text-white sticky top-0">
          <tr>
            <th class="p-3 text-left"></th>
            <th class="p-3 text-left font-medium">NOME DO INGREDIENTE</th>
            <th class="p-3 text-left font-medium">
              PESO <span class="font-normal text-sm">(Peso que o ingrediente foi comprado.)</span>
            </th>
            <th class="p-3 text-left font-medium">UNIDADE</th>
            <th class="p-3 text-left font-medium">PREÇO EM R$</th>
            <th class="p-3 text-left font-medium">
              QUANTIDADE <span class="font-normal text-sm">(Quantidade que vai ser usada no produto.)</span>
            </th>
            <th class="p-3 text-left font-medium">CUSTO DO INGREDIENTE</th>
          </tr>
        </thead>

        <!-- Corpo da tabela -->
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(data, index) of allProductIngredient" :key="index" class="hover:bg-gray-50 transition-colors">
            <!-- Botão de deletar -->
            <td class="p-3">
              <CircleX class="text-red-500 hover:text-red-700 transition-colors"
                @click="deleteIngredientOfArray(index)" />
            </td>

            <!-- Nome do ingrediente -->
            <td class="p-3">
              <input type="text" placeholder="MATERIAL" v-model="data.name"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
            </td>

            <!-- Peso -->
            <td class="p-3">
              <input type="number" placeholder="PESO" v-model="data.weight" @change="calculateCostOfAnIngredient(index)"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
            </td>

            <!-- Unidade 1 -->
            <td class="p-3">
              <select name="SelectedUnit1" v-model="data.unit1"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option disabled selected>Selecione uma unidade.</option>
                <option value="GRAMAS">GRAMAS</option>
                <option value="UNIDADE">UNIDADE</option>
                <option value="ML">ML</option>
              </select>
            </td>

            <!-- Preço -->
            <td class="p-3">
              <div class="flex items-center gap-2">
                <InputCurrency v-model="data.price" @change="calculateCostOfAnIngredient(index)"
                  @update="calculateCostOfAnIngredient(index)" />
              </div>
            </td>

            <!-- Quantidade -->
            <td class="p-3">
              <input type="number" placeholder="QUANTIDADE" v-model="data.quantity"
                @change="calculateCostOfAnIngredient(index)"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
            </td>
            <!-- Custo do ingrediente -->
            <td class="p-3">
              <p class="text-gray-700">R$ {{ data.ingredient_cost }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex w-full justify-around items-center border-y-2 gap-10 p-4 ">
      <div class="flex-1">
        <select class="border-2 rounded-md w-full h-8" v-model="productJokerSelected" @change="addProductJoker">
          <option disabled :value="null">Selecione produtos coringa.</option>
          <option :value="productJoker" v-for="(productJoker, index) in productsJoker" :key="index">
            {{ productJoker.name }}
          </option>
        </select>
      </div>
      <Button class="flex-1 bg-[#5A6FA5]" @click="handleButtonToGoBack">Voltar</Button>
      <Button class="flex-1 bg-[#5A6FA5]" @click="addNewIngredient">Adicionar novo ingrediente</Button>
      <Button class="flex-1 bg-[#5A6FA5]" @click="sendDataToTheBackend">Salvar</Button>
    </div>
    <div class="flex gap-4 bg-muted text-white p-4 rounded-lg shadow-md">
      <!-- Coluna 1: Inputs de configuração -->
      <div class="flex flex-col justify-between w-1/2 gap-4">
        <!-- Rendimentos -->
        <div class="flex items-center justify-between p-1 bg-[#5A6FA5]  rounded-md">
          <p class="text-base">Rendimentos:</p>
          <InputNumber v-model="dataProduct.income" @change="updateAllNumbers(false)" @update="updateAllNumbers(false)"
            class="w-[10em] px-2 py-1 text-sm" />
        </div>

        <!-- Tempo da receita -->
        <div class="flex items-center justify-between p-1 bg-[#5A6FA5]  rounded-md">
          <p class="text-base">Tempo da receita (min):</p>
          <InputNumber v-model="dataProduct.recipeTime" @change="updateAllNumbers(false)"
            @update="updateAllNumbers(false)" class="w-[10em] px-2 py-1 text-sm" />
        </div>

        <!-- Porcentagem de lucro -->
        <div class="flex items-center justify-between p-1 bg-[#5A6FA5]  rounded-md">
          <p class="text-base">Lucro (%):</p>
          <InputPercentage v-model="dataProduct.profitPecentage" @change="updateAllNumbers(false)"
            @update="updateAllNumbers(false)" class="w-[10em] px-2 py-1 text-sm" />
        </div>

        <!-- Custo Operacional -->
        <div class="flex items-center justify-between p-1 bg-[#5A6FA5]  rounded-md">
          <p class="text-base">Custo Operacional:</p>
          <InputCurrency v-model="dataProduct.operationalCost" @change="updateAllNumbers(false)"
            @update="updateAllNumbers(false)" class="w-[10em] px-2 py-1 text-sm" />
        </div>
      </div>

      <!-- Coluna 2: Custos e valores calculados -->
      <div class="flex flex-col w-1/2 gap-4">
        <!-- Custo da receita -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Custo da receita:</p>
          <p class="text-base font-semibold">R$ {{ dataProduct.costOfAllIngredients }}</p>
        </div>

        <!-- Custo fixo -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Custo fixo:</p>
          <p class="text-base font-semibold">R$ {{ dataProduct.fixedCost }}</p>
        </div>

        <!-- Mão de Obra -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Mão de Obra:</p>
          <p class="text-base font-semibold">R$ {{ dataProduct.labor }}</p>
        </div>

        <!-- Lucro -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Lucro:</p>
          <p class="text-base font-semibold">R$ {{ dataProduct.profit }}</p>
        </div>
      </div>

      <!-- Coluna 3: Custo total da receita -->
      <div class="flex flex-col w-1/2 gap-4">
        <!-- Valor final da receita -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Valor final:</p>
          <p class="text-base font-semibold">R$ {{ dataProduct.priceFinalRevenue }}</p>
        </div>
        <!-- Custo total da receita -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Custo total:</p>
          <p class="text-base font-semibold">R$ {{ dataProduct.costOfRevenue }}</p>
        </div>
        <!-- Valor da unidade -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Valor/unidade:</p>
          <p class="text-base font-semibold">R$ {{ dataProduct.pricePerUnit }}</p>
        </div>
      </div>
    </div>

  </div>
</template>