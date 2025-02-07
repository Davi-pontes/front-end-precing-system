<script setup lang="ts">
import {
  NumberField,
  NumberFieldContent,
  NumberFieldInput
} from '@/components/ui/number-field';
import { ref, watch } from 'vue';

const model = defineModel({ required: true, type: Number });
const isFocused = ref(false);
const emit = defineEmits(['update']);

watch(model, (newValue) => {
  emit('update', newValue);
});

// Função de formatação de porcentagem
const formatPercentage = (valor: any) => {
  return `${(valor * 100).toFixed(2)}%`; // Multiplica por 100 para exibir como porcentagem
};

// Função de máscara para aplicar a formatação no input
const formatInputPercentage = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const onlyDigits = input.value
    .split("")
    .filter((s: any) => /\d/.test(s))
    .join("")
    .padStart(3, "0");

  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
  
  model.value = parseFloat(digitsFloat) / 100; // Divide por 100 para armazenar o valor decimal internamente
};

const getFormattedValue = () => {
  return formatPercentage(model.value); // Aplica formatação de porcentagem
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  model.value = parseFloat(model.value.toFixed(4)); // Limita o número de casas decimais
};
</script>

<template>
  <NumberField
    id="percent"
    :min="0"
    :step="0.01"
    v-model="model"
    :default-value="0"
    :format-options="{
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }"
  >
    <NumberFieldContent>
      <NumberFieldInput
        @focus="handleFocus"
        @blur="handleBlur"
        @input="formatInputPercentage"
        :value="isFocused ? (model * 100).toFixed(2) : getFormattedValue()"
      />
    </NumberFieldContent>
  </NumberField>
</template>
