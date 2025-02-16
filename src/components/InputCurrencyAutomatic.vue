<template>
  <input
    type="text"
    v-model="displayValue"
    @input="handleInput"
    @blur="formatValue"
    class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="0,00"
  />
</template>

<script setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

// Emits
const emit = defineEmits(['update:modelValue']);

// Estado reativo para o valor exibido no input
const displayValue = ref('');

// Formata o valor monetário
const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Atualiza o valor exibido quando o prop `modelValue` muda
watch(
  () => props.modelValue,
  (newValue) => {
    displayValue.value = formatCurrency(newValue);
  },
  { immediate: true }
);

// Manipula a entrada do usuário
const handleInput = (event) => {
  const value = event.target.value;
  const numericValue = value.replace(/\D/g, ''); // Remove tudo que não for dígito
  const formattedValue = (numericValue / 100).toFixed(2); // Converte para decimal
  emit('update:modelValue', parseFloat(formattedValue)); // Emite o valor numérico
};

// Formata o valor ao perder o foco
const formatValue = () => {
  displayValue.value = formatCurrency(props.modelValue);
};
</script>