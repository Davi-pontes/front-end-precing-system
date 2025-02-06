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

// Formata para sempre ter duas casas decimais ao digitar
const formatDecimal = (value: string) => {
  let numericValue = value.replace(/\D/g, ''); // Remove tudo que não for número
  while (numericValue.length < 3) {
    numericValue = '0' + numericValue; // Garante pelo menos 3 dígitos para evitar erro
  }
  const intPart = numericValue.slice(0, -2) || '0';
  const decimalPart = numericValue.slice(-2);
  return `${parseInt(intPart, 10)}.${decimalPart}`;
};

// Sempre exibir o valor formatado como moeda quando não estiver editando
const getFormattedValue = () => {
  return model.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Evento de foco
const handleFocus = () => {
  isFocused.value = true;
};

// Evento de perda de foco
const handleBlur = () => {
  isFocused.value = false;
  model.value = parseFloat(formatDecimal(model.value.toString())); // Garante formatação correta
};

// Evento quando o usuário digita
const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const formattedValue = formatDecimal(input.value);
  model.value = parseFloat(formattedValue);
};
</script>

<template>
  <NumberField
    id="balance"
    :min="0"
    :step="0.01"
    v-model="model"
    :default-value="0"
    :format-options="{
      style: 'currency',
      currency: 'BRL',
      currencyDisplay: 'symbol',
      currencySign: 'accounting'
    }"
  >
    <NumberFieldContent>
      <NumberFieldInput
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        :value="isFocused ? model.toFixed(2) : getFormattedValue()"
      />
    </NumberFieldContent>
  </NumberField>
</template>
