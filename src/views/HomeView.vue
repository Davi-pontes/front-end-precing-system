<script setup lang="ts">
import axios, { AxiosError } from 'axios'
import TableComponent from '@/components/Table.vue'
import type { ICategory, ICategoryWithProducts } from '@/interface/Category'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { columnsProduct } from '@/components/ColumnsProduct'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import TagInput from '@/components/TagInput.vue'
import { HttpGetCategory } from '@/http/category/get-category'
import type { IProduct } from '@/interface/Product'
import Card from '@/components/Card.vue'

const router = useRouter()

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
  const localStorageObject = localStorage.getItem('User')
  if (localStorageObject) {
    const parsedObject = JSON.parse(localStorageObject)
    nameUser.value = parsedObject.name || ''
    idUser.value = parsedObject.id || ''
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
function handleUpdate(data: any) {
  if (data && data.only === 1) {
    router.push({
      path: 'product/add',
      query: {
        id: idUser.value,
        idP: data.id_product
      }
    })
  } else {
    router.push({
      path: 'register',
      query: {
        idU: idUser.value,
        idP: data.id_product
      }
    })
  }
}
async function handleDelete(dataToDeleted: any) {
  try {
    const { data } = await axios.delete(urlApiBackEnd + '/product', {
      params: {
        id: dataToDeleted.id_product
      },
      withCredentials: true
    })
    if (data) {
      productDeletedUpdateData(data)
      handleAlert('Produto deletado com sucesso!')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
function productDeletedUpdateData(data: any) {
  productToRender.value = allCategoryAndProducts.value.products.filter(
    (it) => it.id_product !== data.id_product
  )
}
//Função que leva usuario pra ver os detalhes do produto
function handleDetail(data: any) {
  router.push({
    path: 'product/add',
    query: {
      id: idUser.value,
      idP: data.id_product
    }
  })
}
// Função para mostrar alertas de error
function handleError(message: string) {
  messageForError.value = message
  showMessageErro.value = true
}
// Função para remover alertas de erro
function removeAlertError() {
  showMessageErro.value = false
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
//Função para filtra produtos com base na categoria selecionada no meu tag input
function filterProductByCategory(categories: ICategory[]) {
  if (categories.length === 0) {
    productToRender.value = allCategoryAndProducts.value.products
  } else {
    productToRender.value = allCategoryAndProducts.value.products.filter(
      (product) => categories.some((category: ICategory) => category.id === product.id_category)
    )
  }
}
getLocalStorage()
getAllCategoryAndProduct()
</script>

<template>
  <div class="w-full h-full border shadow-lg rounded-md p-4 mt-7">
    <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
    <div class="w-full h-[12em] border shadow-lg rounded-md p-4 my-7">
      <Card>
        <template v-slot:qtdProducts>
          {{ allCategoryAndProducts.totalProducts }}
        </template>
        <template v-slot:averageProfit>
          {{ allCategoryAndProducts.averageProfit ? allCategoryAndProducts.averageProfit.toFixed(2) : 0 }}
        </template>
      </Card>
    </div>
    <TagInput :label="'Categorias'" :description="'Filtre os produtos de acordo com as categorias.'"
      @filter="filterProductByCategory" v-model="allCategoryAndProducts.category" />
    <TableComponent :columns="columnsProduct" :data-props="productToRender"
      :informationsInputSearch="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }" @update="handleUpdate"
      @delete="handleDelete" @detail="handleDetail">
    </TableComponent>
  </div>
</template>
