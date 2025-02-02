<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  TagsInput,
  TagsInputItem,
  TagsInputItemText
} from '@/components/ui/tags-input'
import type { ICategory } from '@/interface/Category';
import { useForm } from 'vee-validate'
import { ref } from 'vue'

defineProps<{
  label: string
  description: string
  modelValue: any
}>()

const emit = defineEmits(['update:modelValue', 'filter'])

useForm({
  initialValues: {
    data: ['Nada encontrado']
  }
})

// Estado para armazenar os itens selecionados
const selectedTags = ref<ICategory[]>([])

function toggleSelection(tag: ICategory) {
  if (selectedTags.value.includes(tag)) {
    // Remove se já estiver na lista
    selectedTags.value = selectedTags.value.filter(t => t.id !== tag.id)
  } else {
    // Adiciona se não estiver na lista
    selectedTags.value.push(tag)
  }
  emit('filter', selectedTags.value)
}
</script>

<template>
  <form class="w-2/3 space-y-6">
    <FormField v-slot="{ value }" name="data">
      <FormItem>
        <FormLabel>{{ label }}</FormLabel>
        <FormControl>
          <TagsInput :model-value="value">
            <TagsInputItem
              v-for="item in modelValue"
              :key="item"
              :value="item.name"
              :class="{
                'bg-muted text-white': selectedTags.includes(item),
                'bg-gray-200 text-black': !selectedTags.includes(item)
              }"
              class="cursor-pointer transition-colors duration-200 rounded-md p-3"
              @click="toggleSelection(item)"
            >
              <TagsInputItemText />
            </TagsInputItem>
          </TagsInput>
        </FormControl>
        <FormDescription>
          {{ description }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>
