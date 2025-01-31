<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import { watch } from 'vue';

const model = defineModel({ required: true, type: Number })

const emit = defineEmits(['update'])
watch(model, (newValue) => {
  console.log(newValue);

  emit('update', newValue)
})
</script>

<template>
  <NumberField v-model="model" :min="1">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
