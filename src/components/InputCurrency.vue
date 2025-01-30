<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'

const model = defineModel({ required: true, type: Number })
</script>

<template>
  <NumberField id="balance" :min="0" :default-value="0" v-model="model" :format-options="{
    style: 'currency',
    currency: 'BRL',
    currencyDisplay: 'symbol',
    currencySign: 'accounting'
  }">
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
