<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast/use-toast'
import axios from 'axios'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { h, ref } from 'vue'
import * as z from 'zod'
import { useRoute } from 'vue-router'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const route = useRoute()
const idUser = route.query.id
const nameCategory = ref('')

const formSchema = toTypedSchema(z.object({
    nameCategory: z.string().min(2).max(50),
}))

function prepareData(): object {
    const dataForSend = { name: nameCategory.value, user_id: idUser }

    return dataForSend
}

async function handleSendCategory() {
    try {
        const dataFormated = prepareData()

        const { data } = await axios.post(urlApiBackEnd + '/category', dataFormated)
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

const { isFieldDirty } = useForm({
    validationSchema: formSchema,
})
</script>

<template>
    <form class="w-2/3 space-y-6" @submit="handleSendCategory">
        <FormField name="nameCategory" :validate-on-blur="!isFieldDirty">
            <FormItem>
                <FormControl>
                    <Input type="text" placeholder="Adicione o nome da categoria" v-model="nameCategory" />
                </FormControl>
                <FormDescription>
                    Categoria que pode conter varios produtos.
                </FormDescription>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button type="submit">
            Enviar
        </Button>
    </form>
</template>