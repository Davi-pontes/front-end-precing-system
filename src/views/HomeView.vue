<script setup lang="ts">
import axios from 'axios'
import TableComponent from "@/components/Table.vue"
import type { ICategoryWithProducts } from '@/interface/Category'
import { ref, watch } from 'vue'
import { columnsProduct } from '@/components/ColumnsProduct'
import TagInput from '@/components/TagInput.vue'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
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
    if (data) allCategoryAndProducts.value = data
  } catch (error) {
    console.log(error);
  }
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
    <TagInput :label="'Categorias'" :description="'Filtre os produtos de acordo com as categorias.'"
      v-model="allCategoryAndProducts.category" />
    <TableComponent :columns="columnsProduct" :data-props="allCategoryAndProducts?.products"
      :informationsInputSearch="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }">
    </TableComponent>
  </div>
</template>
