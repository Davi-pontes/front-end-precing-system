<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import TableComponent from '@/components/Table.vue'
import { columnsStockIngredient } from '@/components/ColumnsStockIngredient'
import type { ICommandItem } from '@/interface/Combobox'
import Combobox from '@/components/Combobox.vue'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
const urlComunicationBackEnd = import.meta.env.VITE_API_BACKEND
import { Button } from '@/components/ui/button'
import { getUserIdLocalStorage } from '@/composables/getUserId'

const idUser = getUserIdLocalStorage()
const allIngredientStockByUser = ref([])
const dataFormatedToComboBox = ref<ICommandItem[]>([])
const selectedIngredient = ref('')
async function getAllIngredients() {
  const { data } = await axios.get(urlComunicationBackEnd + '/product/ingredient/all', {
    params: { idUser: idUser },
    withCredentials: true
  })
  allIngredientStockByUser.value = data

  formatedDataToCombobox(allIngredientStockByUser.value)
}
function formatedDataToCombobox(data: any) {
  dataFormatedToComboBox.value = data.map((item: any) => {
    return { value: item.id, label: item.name }
  })
}
function handleItemSelected(item: ICommandItem) {
  //console.log(item)
}
getAllIngredients()
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="w-[70%] h-[8em] border shadow-lg rounded-md p-4">
      <span class="font-medium text-xl">Atualize o estoque.</span>
      <div class="flex w-full h-[3em] gap-4 mt-4">
        <Combobox
          :titleInput="'Selecione um produto...'"
          :titleSearch="'Pesquise um produto...'"
          :items="dataFormatedToComboBox"
          v-model="selectedIngredient"
          @itemSelected="handleItemSelected"
        />
        <div>
          <NumberField :min="0" class="border-none">
            <NumberFieldContent class="border rounded-md">
              <NumberFieldDecrement class="border-none" />
              <NumberFieldInput class="border-none" />
              <NumberFieldIncrement class="border-none" />
            </NumberFieldContent>
          </NumberField>
        </div>
        <Button class="bg-[#8095c7]">Atualizar</Button>
      </div>
    </div>
    <div class="border shadow-lg rounded-md p-4 mt-7">
      <TableComponent
        :columns="columnsStockIngredient"
        :data-props="allIngredientStockByUser"
        :informations-input-search="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }"
      />
    </div>
  </div>
</template>
