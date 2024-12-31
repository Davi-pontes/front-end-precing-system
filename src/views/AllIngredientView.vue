<script setup lang="ts">
import axios from 'axios'
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import type { IIngredient } from '@/interface/Ingredient'
import TableComponent from "@/components/Table.vue"
import NavBar from '@/components/NavBar.vue'
import Loading from '@/components/animations/Loading.vue'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

const route = useRoute()
const idUser = route.query.id as string
const ingredients = ref<IIngredient[]>([])
const isLoading = ref(true)
let showLoading = ref(false)

const getAllIngredients = async () => {
  try {
    const { data } = await axios.get<IIngredient[]>(`${urlApiBackEnd}/product/ingredient/all`, {
      params: { idUser },
      withCredentials: true,
    })
    ingredients.value = data
  } catch (error) {
    console.error('Erro ao buscar os ingredientes:', error)
  } finally {
    isLoading.value = false
  }
}
onBeforeMount(async() => {
  showLoading.value = true
  await getAllIngredients()
  showLoading.value = false
})
</script>

<template>
  <main>
    <Loading v-if="showLoading"/>
    <NavBar :showButtonAddCategory="false" ></NavBar>
    <TableComponent v-if="!isLoading" :ingredients=ingredients></TableComponent>
  </main>
</template>
