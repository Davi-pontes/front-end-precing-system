<script setup lang="ts">
import axios, { AxiosError } from 'axios'
import TableComponent from "@/components/Table.vue"
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import type { IIngredient } from '@/interface/Ingredient'
import { columnsIngredient } from '@/components/ColumnsIngredient'
import FormIngredient from '@/components/FormIngredient.vue'
import MessageAlert from '@/components/MessageAlert.vue';
import MessageError from '@/components/MessageError.vue';

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

const route = useRoute()
const idUser = route.query.id as string
const ingredients = ref<IIngredient[]>([])
const isLoading = ref(true)
const dataToUpdate = ref()
const messageForError = ref('')
const showMessageErro = ref(false)
const messageForAlert = ref('');
const showMessageAlert = ref(false);
let showLoading = ref(false)
let showPopUpUpdateIngredient = ref(false)

function handleError(message: string) {
  messageForError.value = message
  showMessageErro.value = true
}
function handleRemoveAlertError() {
  showMessageErro.value = false
  messageForError.value = ''
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

async function getAllIngredients(): Promise<IIngredient[]> {
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
function handleUpdate(dataSendPopUpIngredient: any) {
  dataToUpdate.value = dataSendPopUpIngredient
  showPopUpUpdateIngredient.value = true
}
async function sendDataToupdateIngredient(dataToUpdate: any) {
  try {
    dataToUpdate.idUser = idUser
    const { data } = await axios.patch(urlApiBackEnd + '/product/ingredient/specific', dataToUpdate)
    console.log(data.updatedNumbersIngredient.quantityOfProductsChanged);
    
    const productsChanged = data.updatedNumbersIngredient.quantityOfProductsChanged

    handleAlert(`Ingrediente atualizado com sucesso! ${productsChanged} produto(s) também foram ajustado(s).`)
    showPopUpUpdateIngredient.value = false
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data);
    } else {
      handleError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
    }
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
    <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="handleRemoveAlertError" />
    <FormIngredient v-if="showPopUpUpdateIngredient" :selectdIngredient="dataToUpdate"
      @close="showPopUpUpdateIngredient = false" @dataToupdate="sendDataToupdateIngredient" />
    <div class="border shadow-lg rounded-md p-4 mt-7">
      <TableComponent v-if="!isLoading" :columns="columnsIngredient" :dataProps="ingredients"
        :informationsInputSearch="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }" @update="handleUpdate">
      </TableComponent>
    </div>
  </main>
</template>
