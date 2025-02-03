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
  emit('update', newValue)
})
</script>

<template>
  <NumberField id="balance" :min="0" :step="0.01" :default-value="0" v-model="model" :format-options="{
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol',
    currencySign: 'accounting'
  }">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement/>
    </NumberFieldContent>
  </NumberField>
</template>
