<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ref } from 'vue'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import type { ICommandItem } from '@/interface/Combobox'

defineProps<{
    titleInput : string
    titleSearch : string
    items: ICommandItem[]
}>()
const emit = defineEmits<{
    (event: 'itemSelected', value: ICommandItem): void
}>()

const open = ref(false)
const value = ref('')
function itemSelected(item:ICommandItem){
    open.value = false
    emit('itemSelected', item)
}
</script>

<template>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          class="w-[400px] justify-between"
        >
          {{ value ? items.find((item) => item.label === value)?.label : titleInput }}
  
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[400px] p-0">
        <Command v-model="value">
          <CommandInput :placeholder= titleSearch></CommandInput>
          <CommandEmpty>Nenhum item encontrado.</CommandEmpty>
          <CommandList>
            <CommandGroup class=" max-h-[9em] overflow-y-auto">
              <CommandItem
                v-for="item in items"
                :key="item.value"
                :value="item.label"
                @select="itemSelected(item)"
              >
                <Check
                  :class="cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )"
                />
                {{ item.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </template>