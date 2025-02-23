<script setup lang="ts">
import * as z from 'zod'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import UpdateCategory from '@/components/UpdateCategory.vue'
import TableComponent from '@/components/Table.vue'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios, { AxiosError } from 'axios'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { HttpPostCategory } from '@/http/category/post-category'
import type { ICategory } from '@/interface/Category'
import { HttpGetCategory } from '@/http/category/get-category'
import { columnsCategory } from '@/components/ColumnsCategory'
import { HttpDeleteCategory } from '@/http/category/delete-category'
import { HttpPathCategory } from '@/http/category/update-category'
import { getUserIdLocalStorage } from '@/composables/getUserId'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const idUser = ref('')
const nameCategory = ref('')
const messageForError = ref('')
const messageForAlert = ref('')
const allCategory = ref<ICategory[]>([])
const changeCategory = ref<ICategory>({
  id: '',
  name: '',
  user_id: idUser.value
})
const showMessageErro = ref(false)
const showMessageAlert = ref(false)
const showPopUpUpdateCategory = ref(false)
const httpPostCategory = new HttpPostCategory(axios, urlApiBackEnd)
const httpGetCategory = new HttpGetCategory(axios, urlApiBackEnd)
const httpDeleteCategory = new HttpDeleteCategory(axios, urlApiBackEnd)
const httpPathCategory = new HttpPathCategory(axios, urlApiBackEnd)

const formSchema = toTypedSchema(
  z.object({
    nameCategory: z.string().min(2).max(50)
  })
)

function handleAlert(message: string) {
  messageForAlert.value = message
  showMessageAlert.value = true
}
// Função para remover alertas
function removeAlert() {
  showMessageAlert.value = false
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

function prepareData(): ICategory {
  const dataForSend = { name: nameCategory.value, user_id: idUser.value as string }

  return dataForSend
}
async function allCategoryByIdUser() {
  try {
    allCategory.value = await httpGetCategory.getAllCategory(idUser.value as string)

  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }

}
async function handleSendCategory() {
  try {
    if (nameCategory.value === '') {
      handleError('Digite o nome da categoria.')
      return
    }
    const dataFormated = prepareData()

    const data = await httpPostCategory.createCategory(dataFormated)
    
    if (data) {
      nameCategory.value = ''
      handleAlert('Categoria adicionada com sucesso!')
      allCategory.value = [...allCategory.value, {...data, product_count:0}]
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
async function handleDelete(dataToDeleted: any) {
  try {
    const categoryDeleted = await httpDeleteCategory.deleteCatory(dataToDeleted.id)

    handleAlert('Categoria deletada com sucesso!')
    productDeletedUpdateData(categoryDeleted)

  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
async function handleUpdateCategory(dataToUpdate: ICategory) {
  try {
    const updatedCategory = await httpPathCategory.updateCategory(dataToUpdate)

    allCategory.value = allCategory.value.map((category) =>
      category.id === updatedCategory.id
        ? { ...category, name: updatedCategory.name }
        : category
    );
    showPopUpUpdateCategory.value = false
    handleAlert('Categoria atualizada com sucesso!')
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}
function openPopUpUpdate(dataToUpdate: ICategory) {
  changeCategory.value = dataToUpdate
  showPopUpUpdateCategory.value = true
}
function productDeletedUpdateData(idCategory: string) {
  allCategory.value = allCategory.value.filter(
    (it) => it.id !== idCategory
  )
}

const { isFieldDirty } = useForm({
  validationSchema: formSchema
})
idUser.value = getUserIdLocalStorage()
allCategoryByIdUser()
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
    <UpdateCategory v-if="showPopUpUpdateCategory" :selectedCategory="changeCategory"
      @close="showPopUpUpdateCategory = false" @dataToupdate="handleUpdateCategory" />
    <form class="w-2/3 space-y-6" @submit.prevent="handleSendCategory">
      <FormField name="nameCategory" :validate-on-blur="!isFieldDirty">
        <FormItem>
          <FormControl>
            <Input type="text" placeholder="Adicione o nome da categoria" v-model="nameCategory"/>
          </FormControl>
          <FormDescription>Adicione uma nova categoria.</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" class="bg-muted"> Salvar </Button>
    </form>
    <div class="border shadow-lg rounded-md p-4 mt-7">
      <TableComponent :columns="columnsCategory" :data-props="allCategory"
        :informations-input-search="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }" @delete="handleDelete"
        @update="openPopUpUpdate" @detail="openPopUpUpdate">
      </TableComponent>
    </div>
  </div>
</template>
