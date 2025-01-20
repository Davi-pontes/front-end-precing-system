<script setup lang="ts">
import axios from 'axios'
import TableComponent from "@/components/Table.vue"
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { IIngredient } from '@/interface/Ingredient'
import { columnsIngredient } from '@/components/ColumnsIngredient'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

const route = useRoute()
const idUser = route.query.id as string
const ingredients = ref<IIngredient[]>([])
const isLoading = ref(true)
let showLoading = ref(false)

const getAllIngredients = async (): Promise<IIngredient[]> => {
  try {
    const { data } = await axios.get<IIngredient[]>(`${urlApiBackEnd}/product/ingredient/all`, {
      params: { idUser },
      withCredentials: true,
    })
    return data
  } catch (error) {
    console.error('Erro ao buscar os ingredientes:', error)
    throw new Error("Error ao requisitar ingredientes")
  } finally {
    isLoading.value = false
  }
}
onMounted(async () => {
  showLoading.value = true
  ingredients.value = await getAllIngredients()
  showLoading.value = false
})
</script>

<template>
  <main class="w-full h-full">
    <div class="border shadow-lg rounded-md p-4 mt-7">
      <TableComponent v-if="!isLoading" 
      :columns="columnsIngredient" 
      :dataProps="ingredients" 
      :informationsInputSearch="{placeHolder:'Filtre por nome.', searchProperty:'name'}">
      </TableComponent>
    </div>
  </main>
</template>
