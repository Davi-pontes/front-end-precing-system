<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field } from 'vee-validate'
import * as z from 'zod'
import { Input } from '@/components/ui/input' // Certifique-se de que está importando corretamente

const formSchema = toTypedSchema(
  z.object({
    nameProduct: z.string()
      .min(2, { message: 'Nome deve conter pelo menos 2 caracteres.' })
      .max(100, { message: 'Texto muito longo.' }),
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
})

const submitForm = handleSubmit(values => {
  console.log('Form enviado:', values)
})
</script>

<template>
  <Form @submit="submitForm" class="space-y-4">
    <div class="flex-1">
      <Field name="nameProduct" v-slot="{ field, errorMessage }">
        <Input class="bg-white w-full" v-bind="field" placeholder="Nome do produto" />
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
      </Field>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
  </Form>
</template>
