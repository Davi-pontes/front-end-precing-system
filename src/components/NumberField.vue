<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'
import { ref } from 'vue';

const inputValue = ref(1)
// defineProps<{
//     title: string
// }>()
</script>

<template>
   <NumberField v-model="inputValue" :min="1" class="border-none">
    <NumberFieldContent class="border-none">
      <NumberFieldDecrement class="border-none" />
      <NumberFieldInput class="border-none" />
      <NumberFieldIncrement class="border-none" />
    </NumberFieldContent>
  </NumberField>
</template>