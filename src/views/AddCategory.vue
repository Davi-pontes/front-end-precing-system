<script setup lang="ts">
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
import * as z from 'zod'
import { useRoute } from 'vue-router'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const route = useRoute()
const idUser = route.query.id
const nameCategory = ref('')
const messageForError = ref('')
const showMessageErro = ref(false)
const messageForAlert = ref('')
const showMessageAlert = ref(false)

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

function prepareData(): object {
  const dataForSend = { name: nameCategory.value, user_id: idUser }

  return dataForSend
}

async function handleSendCategory() {
  try {
    if(nameCategory.value === ''){
      handleError('Digite o nome da categoria.')
      return
    }
    const dataFormated = prepareData()
    
    const { data } = await axios.post(urlApiBackEnd + '/category', dataFormated,{withCredentials: true})

    if(data){
      nameCategory.value = ''
      handleAlert('Categoria adicionada com sucesso!')
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      handleError(error.response?.data)
    } else {
      handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
    }
  }
}

const { isFieldDirty } = useForm({
  validationSchema: formSchema
})
</script>

<template>
  <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
  <MessageError
      v-if="showMessageErro"
      :message="messageForError"
      @removeAlert="removeAlertError"
    />
  <form class="w-2/3 space-y-6" @submit.prevent="handleSendCategory">
    <FormField name="nameCategory" :validate-on-blur="!isFieldDirty">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Adicione o nome da categoria" v-model="nameCategory" />
        </FormControl>
        <FormDescription> Categoria que agrupa diversos produtos. </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="bg-muted"> Enviar </Button>
  </form>
</template>
