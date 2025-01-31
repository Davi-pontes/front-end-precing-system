<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const value = defineModel<string>()

</script>

<template>
  <Select v-model="value">
    <SelectTrigger class="bg-white">
      <SelectValue placeholder="Esse é um produto coringa?" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="0">
          Não
        </SelectItem>
        <SelectItem value="1">
          Sim
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>