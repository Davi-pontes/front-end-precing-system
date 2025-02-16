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
import type { IProduct } from '@/interface/Product'
import { HttpGetProduct } from '@/http/product/get-product'
import { UtilsFormateProduct } from '@/utils/formate-product'
import { HttpCreateProduct } from '@/http/product/create-product'
import { HttpUpdateProduct } from '@/http/product/update-product'
import { HttpGetProductIngredient } from '@/http/productIngredient/get-productIngredient'
import { HttpGetProductJoker } from '@/http/productJoker/get-productJoker'
import type { ICategory } from '@/interface/Category'
import { HttpCalculationProductWithIngredient } from '@/http/calculation/calculationProductIngredient'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const route = useRoute()
const router = useRouter()

const httpGetProduct = new HttpGetProduct(axios, urlApiBackEnd)
const httpGetCategory = new HttpGetCategory(axios, urlApiBackEnd)
const httpGetProductJoker = new HttpGetProductJoker(axios, urlApiBackEnd)
const httpGetProductIngredient = new HttpGetProductIngredient(axios, urlApiBackEnd)
const httpCreateProduct = new HttpCreateProduct(axios, urlApiBackEnd)
const httpUpdateProduct = new HttpUpdateProduct(axios, urlApiBackEnd)
const httpCalculation = new HttpCalculationProductWithIngredient(axios, urlApiBackEnd)

const costOfAllIngredients = ref(0)

const dataProduct = ref<any>({
  nameProduct: '',
  isJoker: '0',
});
const basesCalculation = ref({
  income: 1,
  recipe_time: 0,
  profit_percentage: 0,
  labor: 0,
  operacional_cost: 0,
})
const resultCalculation = ref({
  fixed_cost: 0,
  profit: 0,
  final_recipe_price: 0,
  price_per_unit: 0,
  revenue_cost: 0,
})


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
const idUser = ref<LocationQueryValue | LocationQueryValue[]>(null)
const allCategories = ref<ICategory[]>([])
const showMessage = ref(false)
const message = ref('')
const thereWasChanged = ref(false)
const showLoading = ref(false)
const dataFormatedToComboBox = ref([])
const dataProductJokerFormatedToComboBox = ref([])
const selectedCategory = ref('')
const selectedProductJoker = ref('')
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

async function updateAllNumbers(functionThatCalled: boolean) {
  try {
    if (id_product.value && !functionThatCalled) thereWasChanged.value = true

    const dataToSendService = {
      productInformation: {
        ...basesCalculation.value, cost_of_all_ingredients: costOfAllIngredients.value
      },
      productIngredients: allProductIngredient.value
    }

    const data = await httpCalculation.calculationDatasProductWithIngredient(dataToSendService)

    costOfAllIngredients.value = data.cost_of_all_ingredients

    resultCalculation.value = {
      fixed_cost: data.fixed_cost,
      profit: data.profit,
      final_recipe_price: data.final_recipe_price,
      price_per_unit: data.price_per_unit,
      revenue_cost: data.revenue_cost
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Estamos com problema no momento por favor tente mais tarde!')
    }
  }
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

function handleProductJokerSelected(item: any): void {
  const productJokerSelected = productsJoker.value.find(it => it.id_product === item.value)

  if (productJokerSelected) {
    const ingredient_cost =
      productJokerSelected.revenue_cost / productJokerSelected.income
    const ingredientCostFormated = parseFloat(ingredient_cost.toFixed(2))
    const addProductJoker = {
      name: productJokerSelected.name,
      weight: productJokerSelected.income,
      unit1: 'UNIDADE',
      price: productJokerSelected.revenue_cost,
      quantity: 1,
      ingredient_cost: ingredientCostFormated,
      id_product: id_product.value ? id_product.value : null
    }
    allProductIngredient.value.push(addProductJoker)
    updateAllNumbers(true)
  }
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
  const productDataAssembly = UtilsFormateProduct.formatedProductDataToSend(
    dataProduct.value,
    basesCalculation.value,
    resultCalculation.value,
    costOfAllIngredients.value
  )

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

      const datasFormated = UtilsFormateProduct.formateSpecificProduct(productSpecific)

      dataProduct.value = datasFormated.dataProduct
      basesCalculation.value = datasFormated.basesCalculation
      resultCalculation.value = datasFormated.resultCalculation
      costOfAllIngredients.value = datasFormated.costOfAllIngredients

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
      formatedProductJokerDataToCombobox(result)
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
function formatedProductJokerDataToCombobox(data: any) {
  dataProductJokerFormatedToComboBox.value = data.map((item: any) => {
    return { value: item.id_product, label: item.name }
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
    <div class="flex items-center h-[6em] bg-muted gap-4 px-4">
      <div class="flex-1">
        <label for="nameProduct" class="text-white block">Nome do produto:</label>
        <Input class="bg-white w-full" id="nameProduct" type="text" autocomplete="off" v-model="dataProduct.nameProduct"
          @change="updateNameProduct" placeholder="Nome do produto" />
      </div>
      <div class="flex-1">
        <label for="category" class="text-white block">Categoria:</label>
        <Combobox id="category" :titleInput="'Selecione uma categoria...'"
          :titleSearch="'Pesquise por uma categoria...'" :items="dataFormatedToComboBox" name="selectedCategory"
          v-model="selectedCategory" @itemSelected="handleItemSelected" />
      </div>
      <div class="flex-1">
        <label for="productJoker" class="text-white block">Este é um produto coringa?</label>
        <SelectBoolean v-model="dataProduct.isJoker" />
      </div>
    </div>
    <div class="w-full h-[30em] overflow-y-auto shadow-md">
      <table class="w-full bg-white">
        <!-- Cabeçalho da tabela -->
        <thead class="bg-[#5A6FA5] text-white sticky top-0">
          <tr>
            <th class="p-3"></th>
            <th class="p-3 font-normal">NOME DO INGREDIENTE</th>
            <th class="p-3 font-normal">
              PESO <span class="font-normal text-sm block">(Peso que o ingrediente foi comprado.)</span>
            </th>
            <th class="p-3 font-normal">UNIDADE</th>
            <th class="p-3 font-normal">PREÇO EM R$</th>
            <th class="p-3 font-normal">
              QUANTIDADE <span class="font-normal text-sm block">(Quantidade que vai ser usada no produto.)</span>
            </th>
            <th class="p-3 font-normal">CUSTO DO INGREDIENTE</th>
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
            <td class="p-3 text-center">
              <p class="text-gray-700">R$ {{ data.ingredient_cost?.toFixed(2) }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex w-full justify-around items-center border-y-2 gap-10 p-4 ">
      <div class="flex-1">
        <Combobox :titleInput="'Selecione um produto coringa...'" :titleSearch="'Pesquise por um produto coringa...'"
          :items="dataProductJokerFormatedToComboBox" name="selectedCategory" v-model="selectedProductJoker"
          @itemSelected="handleProductJokerSelected" />
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
          <InputNumber v-model="basesCalculation.income" @change="updateAllNumbers(false)"
            @update="updateAllNumbers(false)" class="w-[10em] px-2 py-1 text-sm" />
        </div>

        <!-- Tempo da receita -->
        <div class="flex items-center justify-between p-1 bg-[#5A6FA5]  rounded-md">
          <p class="text-base">Tempo da receita (min):</p>
          <InputNumber v-model="basesCalculation.recipe_time" @change="updateAllNumbers(false)"
            @update="updateAllNumbers(false)" class="w-[10em] px-2 py-1 text-sm" />
        </div>

        <!-- Porcentagem de lucro -->
        <div class="flex items-center justify-between p-1 bg-[#5A6FA5]  rounded-md">
          <p class="text-base">Lucro (%):</p>
          <InputPercentage v-model="basesCalculation.profit_percentage" @change="updateAllNumbers(false)"
            @update="updateAllNumbers(false)" class="w-[10em] px-2 py-1 text-sm" />
        </div>

        <!-- Custo Operacional -->
        <div class="flex items-center justify-between p-1 bg-[#5A6FA5]  rounded-md">
          <p class="text-base">Custo Operacional:</p>
          <InputCurrency v-model="basesCalculation.operacional_cost" @change="updateAllNumbers(false)"
            @update="updateAllNumbers(false)" class="w-[10em] px-2 py-1 text-sm" />
        </div>
      </div>

      <!-- Coluna 2: Custos e valores calculados -->
      <div class="flex flex-col w-1/2 gap-4">
        <!-- Custo com ingredientes -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Custo com ingrediente(s):</p>
          <p class="text-base font-semibold">R$ {{ costOfAllIngredients?.toFixed(2) }}</p>
        </div>

        <!-- Custo fixo -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Custo fixo:</p>
          <p class="text-base font-semibold">R$ {{ resultCalculation.fixed_cost?.toFixed(2) }}</p>
        </div>

        <!-- Mão de Obra -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Mão de Obra:</p>
          <p class="text-base font-semibold">R$ {{ basesCalculation.labor?.toFixed(2) }}</p>
        </div>

        <!-- Lucro -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Lucro:</p>
          <p class="text-base font-semibold">R$ {{ resultCalculation.profit?.toFixed(2) }}</p>
        </div>
      </div>

      <!-- Coluna 3: Custo total da receita -->
      <div class="flex flex-col w-1/2 gap-4">
        <!-- Valor final da receita -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Valor final:</p>
          <p class="text-base font-semibold">R$ {{ resultCalculation.final_recipe_price?.toFixed(2) }}</p>
        </div>
        <!-- Custo total da receita -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Custo total:</p>
          <p class="text-base font-semibold">R$ {{ resultCalculation.revenue_cost?.toFixed(2) }}</p>
        </div>
        <!-- Valor da unidade -->
        <div class="flex items-center justify-between p-2 bg-[#5A6FA5]  rounded-md hover:bg-gray-700 transition-colors">
          <p class="text-base">Valor/unidade:</p>
          <p class="text-base font-semibold">R$ {{ resultCalculation.price_per_unit?.toFixed(2) }}</p>
        </div>
      </div>
    </div>

  </div>
</template>