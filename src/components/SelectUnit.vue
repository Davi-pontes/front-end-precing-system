<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ref, watch } from 'vue';

const props = defineProps<{
    unit: string
}>()

const weightUnits = ["GRAMAS", "UNIDADE", "ML"]

const selectedUnit = ref<string>('Unidades de medida');

watch(() => props.unit, (newUnit) => {
  selectedUnit.value = newUnit ? newUnit : 'Unidades de medida';
}, { immediate: true });

</script>

<template>
    <Select>
        <SelectTrigger>
            <SelectValue :placeholder="selectedUnit" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-for="(unit, index) in weightUnits" :key="index" :value="unit">
                {{ unit }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>
