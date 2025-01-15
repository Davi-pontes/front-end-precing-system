<script setup lang="ts">
import { Label } from '@/components/ui/label'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field'

defineProps<{
    title: string
}>()
</script>

<template>
  <NumberField :title="title">
    <Label>{{ title }}</Label>
    <NumberFieldContent >
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>