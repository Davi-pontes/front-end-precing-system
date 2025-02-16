<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { X, LoaderCircle } from 'lucide-vue-next'
import type { IUpdateIngredient } from '@/interface/Ingredient'
import { nextTick, onMounted, ref, watch } from 'vue'
import * as z from 'zod'
import Input from './ui/input/Input.vue'
import Button from './ui/button/Button.vue'
import SelectUnit from './SelectUnit.vue'
import CardUpdatedProducts from '@/components/CardUpdatedProducts.vue'
import type { IProduct } from '@/interface/Product'

const showLoader = ref(false)
const bottomEl = ref<HTMLElement | null>(null);

const formSchema = toTypedSchema(
  z.object({
    id: z.number().optional(),
    name: z
      .string({ message: 'Nome não pode ser vazio!' })
      .min(2, { message: 'Nome de conter pelo menos 2 caractere(s).' })
      .max(100, { message: 'Texto muito longo.' }),
    unit1: z.enum(['GRAMAS', 'UNIDADE', 'ML'], { message: 'Selecione uma opção.' }).optional(),
    weight: z.number({ message: 'Adicione um peso.' }).min(1, { message: 'Peso não pode ser 0.' }),
    price: z.number({ message: 'Adicione o preço.' }).min(1, { message: 'Preço não pode ser 0.' })
  })
)
const props = defineProps<{
  selectdIngredient: IUpdateIngredient
  updatedProducts: IProduct[]
}>()

const emit = defineEmits(['close', 'dataToupdate'])

const form = useForm({
  validationSchema: formSchema
})

const onSubmit = form.handleSubmit(async (values) => {
  showLoader.value = true

  const formatedData = {
    changeInformation: {
      id: values.id,
      name: values.name,
      price: values.price,
      unit1: values.unit1,
      weight: values.weight
    }
  }
  showLoader.value = true
  emit('dataToupdate', formatedData)
})

function close() {
  emit('close')
}
function propagateInitialValues() {
  if (props.selectdIngredient) {
    form.setValues({
      id: props.selectdIngredient.id,
      name: props.selectdIngredient.name,
      unit1: props.selectdIngredient.unit1,
      weight: props.selectdIngredient.weight,
      price: props.selectdIngredient.price
    })
  }
}
function goToBottom() {
  nextTick(() => {
    bottomEl.value?.scrollIntoView({ behavior: "smooth" });
  });
}
onMounted(() => {
  propagateInitialValues()
})
watch(() => props.updatedProducts, () => {
  showLoader.value = false
  goToBottom()
})
</script>

<template>
  <div class="absolute z-10">
    <div
      class="flex w-[100%] h-[15em] max-h-[30em] bg-white border border-[#d1cece] shadow-lg rounded-lg overflow-auto">
      <div v-if="showLoader"
        class="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center rounded-lg justify-center z-20">
        <LoaderCircle class="w-8 h-8 text-white animate-spin" />
      </div>
      <form @submit.prevent="onSubmit" class="flex flex-col gap-4 p-4 w-full">
        <!-- Botão de Fechar e Linha -->
        <div class="flex flex-col w-full">
          <!-- Botão X -->
          <div class="flex justify-end w-full" @click.prevent="close">
            <Button variant="outline" size="sm" class="p-1">
              <X class="text-[#8095c7]" />
            </Button>
          </div>
        </div>
        <!-- Campos do Formulário -->
        <div class="grid grid-cols-2 gap-4 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
              <FormLabel>Peso em Gramas</FormLabel>
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
        <CardUpdatedProducts v-if="updatedProducts?.length > 0" :products="updatedProducts" />
        <!-- Botão de Salvar -->
        <div class="w-full mt-auto pb-4 text-right">
          <Button v-if="updatedProducts?.length > 0" @click="close" class="w-[11em] bg-[#8095c7]">
            <span>Voltar</span>
          </Button>
          <Button v-else type="submit" class="w-[11em] bg-[#8095c7]">
            <span>Atualizar ingrediente</span>
          </Button>
          <div ref="bottomEl"></div>
        </div>
      </form>
    </div>
  </div>
</template>
