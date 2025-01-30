<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

const model = defineModel({ required: true, type: Number })
</script>

<template>
  <NumberField v-model="model" id="percent" :default-value="0.00" :step="0.01" :format-options="{
    style: 'percent',
  }">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>