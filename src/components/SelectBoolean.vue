<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
const model = defineModel()

</script>

<template>
  <Select >
    <SelectTrigger class="bg-white">
      <SelectValue placeholder="Esse é um produto coringa?"/>
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectItem value="1">
          Sim
        </SelectItem>
        <SelectItem value="0">
          Não
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>