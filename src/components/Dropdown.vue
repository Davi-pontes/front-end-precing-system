<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const props = defineProps<{
  label: string
  datas: any
  showDelete?:boolean 
  onUpdate?: (data: any) => void
  onDelete?: (data: any) => void
  onDetail?: (data: any) => void
  onDuplicate?: (data: any) => void
}>()

function handleUpdate() {
  if (props.onUpdate) {
    props.onUpdate(props.datas)
  }
}
function handleDelete() {
  if (props.onDelete) {
    props.onDelete(props.datas)
  }
}
function handleDetail() {
  if (props.onDetail) {
    props.onDetail(props.datas)
  }
}
function handleDuplicate(){
  if (props.onDuplicate) {
    props.onDuplicate(props.datas)
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>{{ label }}</DropdownMenuLabel>
      <DropdownMenuItem @click="handleUpdate()"> Alterar </DropdownMenuItem>
      <DropdownMenuItem @click="handleDuplicate()"> Duplicar </DropdownMenuItem>
      <DropdownMenuItem @click="handleDetail()">Ver detalhes</DropdownMenuItem>
      <DropdownMenuSeparator v-if="showDelete"/>
      <DropdownMenuItem v-if="showDelete" @click="handleDelete()">Deletar</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
