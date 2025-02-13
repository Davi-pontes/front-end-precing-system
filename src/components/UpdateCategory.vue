<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { X } from 'lucide-vue-next';
import type { ICategory } from '@/interface/Category';
import { ref, watch } from 'vue';
import { Button } from './ui/button';
import { Input } from './ui/input';

const props = defineProps<{
    selectedCategory: ICategory
}>()
const propsUpdated = ref(false)
const categoryData = ref({ ...props.selectedCategory })

const emit = defineEmits(['close', 'dataToupdate'])

function handleButtonUpdate() {
    if (propsUpdated.value) {
        emit('dataToupdate', categoryData.value)
    } else {
        console.log('close');
        emit('close')
    }
}

function close() {
    emit('close')
}
watch(categoryData, () => {
    propsUpdated.value = true
}, { deep: true })
</script>

<template>
    <div class="fixed inset-0 flex items-start justify-center bg-black/50 z-50 pt-20">
        <div class="w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg overflow-auto p-6">
            <form class="flex flex-col gap-4 w-full">
                <!-- Botão de Fechar -->
                <div class="flex justify-end">
                    <Button variant="outline" size="sm" class="p-1" @click.prevent="close">
                        <X class="text-gray-600" />
                    </Button>
                </div>
                <!-- Nome -->
                <FormField name="name">
                    <FormItem>
                        <FormLabel>Nome da categoria</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Nome" v-model="categoryData.name"
                                @keyup.enter.prevent="handleButtonUpdate" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>

                <!-- Botão de Salvar -->
                <div class="w-full mt-auto mb-auto text-right">
                    <Button type="submit" class="bg-[#8095c7]" @click.prevent="handleButtonUpdate">
                        <!-- <RotateCw v-if="showIconRotateCw" class="w-4 h-4 mr-2 animate-spin" /> -->
                        <span>Salvar alterações</span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>