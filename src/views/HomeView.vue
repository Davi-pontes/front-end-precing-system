<script setup lang="ts">
import axios, { AxiosError } from 'axios'
import TableComponent from "@/components/Table.vue"
import type { ICategoryWithProducts } from '@/interface/Category'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { columnsProduct } from '@/components/ColumnsProduct'
import MessageAlert from '@/components/MessageAlert.vue';
import MessageError from '@/components/MessageError.vue';
import TagInput from '@/components/TagInput.vue'

const router = useRouter()

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const messageForError = ref('');
const showMessageErro = ref(false);
const messageForAlert = ref('');
const showMessageAlert = ref(false);
const allCategoryAndProducts = ref<ICategoryWithProducts>(
  {
    category: [],
    products: []
  })
const nameUser = ref('')
const idUser = ref('')

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
    const { data } = await axios.get(urlApiBackEnd + '/category', {
      params: { idUser: idUser.value },
      withCredentials: true
    })
    const calculatePricePerUnit = data.products.map((it: any) =>{ return {...it, price_per_unit: it.final_recipe_price / it.income}})
    
    if (data) allCategoryAndProducts.value = {category:data.category, products: calculatePricePerUnit}
  } catch (error) {
    console.log(error);
    
    if (error instanceof AxiosError) {
      handleError(error.response?.data);
    } else {
      handleError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
    }
  }
}
function handleUpdate(data: any) {
  if (data && data.only === 1) {
    router.push({
      path: 'product/add',
      query: {
        id: idUser.value,
        idP: data.id_product,
      },
    });
  } else {
    router.push({
      path: 'register',
      query: {
        idU: idUser.value,
        idP: data.id_product,
      },
    });
  }
}
async function handleDelete(dataToDeleted: any) {
  try {
    const { data } = await axios.delete(urlApiBackEnd + '/product', {
      params: {
        id: dataToDeleted.id_product
      }
    })
    if (data) {
      handleAlert('Produto deletado com sucesso!')
      productDeletedUpdateData(data)
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data);
    } else {
      handleError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
    }
  }
}
function productDeletedUpdateData(data: any){
  allCategoryAndProducts.value.products = allCategoryAndProducts.value.products.filter(it => it.id_product !== data.id_product)
}
//Função que leva usuario pra ver os detalhes do produto
function handleDetail(data: any) {
  router.push({
    path: 'product/add',
    query: {
      id: idUser.value,
      idP: data.id_product,
    },
  });
}
// Função para mostrar alertas de error
function handleError(message: string) {
  messageForError.value = message;
  showMessageErro.value = true;
}
// Função para remover alertas de erro
function removeAlertError() {
  showMessageErro.value = false;
}
// Função para mostrar alertas
function handleAlert(message: string) {
  messageForAlert.value = message;
  showMessageAlert.value = true;
}
// Função para remover alertas
function removeAlert() {
  showMessageAlert.value = false;
}
watch(
  () => allCategoryAndProducts.value.category,
  (newCategories: any) => {
    allCategoryAndProducts.value.products = allCategoryAndProducts.value.products.filter((product) =>
      newCategories.some((category: any) => category.id === product.id_category)
    )
  }
)
getLocalStorage()
getAllCategoryAndProduct()
</script>

<template>
  <div class="w-full h-full border shadow-lg rounded-md p-4 mt-7">
    <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
    <TagInput :label="'Categorias'" :description="'Filtre os produtos de acordo com as categorias.'"
      v-model="allCategoryAndProducts.category" />
    <TableComponent :columns="columnsProduct" :data-props="allCategoryAndProducts?.products"
      :informationsInputSearch="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }" @update="handleUpdate"
      @delete="handleDelete" @detail="handleDetail">
    </TableComponent>
  </div>
</template>
