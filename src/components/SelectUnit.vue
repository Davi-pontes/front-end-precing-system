<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'


const weightUnits = ["GRAMA", "UNIDADE", "ML"]
</script>

<template>
    <Select>
        <SelectTrigger>
            <SelectValue placeholder="Unidades de medida" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-for="(unit, index) in weightUnits" :key="index" :value="unit">
                {{ unit }}
            </SelectItem>
        </SelectContent>
    </Select>
</template>