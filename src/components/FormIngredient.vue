<script setup lang="ts">
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { X, RotateCw } from 'lucide-vue-next';
import * as z from 'zod'
import Input from './ui/input/Input.vue'
import Button from './ui/button/Button.vue'
import SelectUnit from './SelectUnit.vue'
import type { IUpdateIngredient } from '@/interface/Ingredient';
import { onMounted } from 'vue';
import axios from 'axios';

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

const formSchema = toTypedSchema(z.object({
    name: z.string({ message: "Nome não pode ser vazio!" }).min(2, { message: 'Nome de conter pelo menos 2 caractere(s).' }).max(100, { message: "Texto muito longo." }),
    unit1: z.enum(["GRAMAS", "UNIDADE", "ML"], { message: "Selecione uma opção." }).optional(),
    weight: z.number({ message: "Adicione um peso." }).min(1, { message: "Peso não pode ser 0." }),
    price: z.number({ message: "Adicione o preço." }).min(1, { message: "Preço não pode ser 0." })
}))

const props = defineProps<{
    selectdIngredient: IUpdateIngredient
}>()

const emit = defineEmits(['close', 'completed'])

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
    console.log('Form submitted!', values)
    const formatedData = {
        changeInformation: {
          name: values.name,
          price: values.price
        },
        idUser: '8oZ_9G8At'
      }
      const { data } = await axios.patch(urlApiBackEnd + '/product/ingredient/specific', formatedData)
})

function close() {
    emit('close')
}
function propagateInitialValues() {
    if (props.selectdIngredient) {
        form.setValues({
            name: props.selectdIngredient.name,
            unit1: props.selectdIngredient.unit1,
            weight: props.selectdIngredient.weight,
            price: props.selectdIngredient.price,
        });
    }
}
onMounted(() => {
    propagateInitialValues()
})
</script>

<template>
    <div class="absolute flex justify-center w-full h-full" style="z-index: 10;">
        <div class="flex w-[80%] h-[25dvh] bg-white border border-[#8095c7] rounded-lg overflow-auto">
            <form @submit.prevent="onSubmit" class="flex flex-col gap-4 p-4 w-full">
                <!-- Botão de Fechar e Linha -->
                <div class="flex flex-col w-full">
                    <!-- Botão X -->
                    <div class="flex justify-end w-full" @click.prevent="close">
                        <Button variant="outline" size="sm" class="p-1">
                            <X />
                        </Button>
                    </div>
                    <!-- Linha de Divisão -->
                    <div class="w-full h-[1px] bg-slate-400 mt-2"></div>
                </div>

                <!-- Campos do Formulário -->
                <div class="grid grid-cols-4 gap-4 w-full">
                    <!-- Nome -->
                    <FormField name="name" v-slot="{ field }">
                        <FormItem>
                            <FormLabel>Nome ingrediente</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Nome" v-bind="field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- Unidade -->
                    <FormField name="unit1" v-slot="{ field }">
                        <FormItem>
                            <FormLabel>Unidade</FormLabel>
                            <FormControl>
                                <SelectUnit :unit="field.value" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- Peso -->
                    <FormField name="weight" v-slot="{ field }">
                        <FormItem>
                            <FormLabel>Peso</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Peso do ingrediente" v-bind="field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>

                    <!-- Preço -->
                    <FormField name="price" v-slot="{ field }">
                        <FormItem>
                            <FormLabel>Preço</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Preço do ingrediente" v-bind="field" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    </FormField>
                </div>

                <!-- Botão de Salvar -->
                <div class="w-full mt-auto text-right">
                    <Button type="submit" class="bg-[#8095c7]">
                        Salvar alterações
                        <RotateCw />
                    </Button>
                </div>
            </form>
        </div>
    </div>

</template>