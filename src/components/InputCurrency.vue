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

const maskCurrency = (valor: any, locale: any = 'pt-BR', currency = 'BRL') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor);
};

const mascaraMoeda = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const onlyDigits = input.value
    .split("")
    .filter((s: any) => /\d/.test(s))
    .join("")
    .padStart(3, "0");

  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
  model.value = parseFloat(digitsFloat);
};

const getFormatValue = () => {
  return maskCurrency(model.value);
};

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
  model.value = parseFloat(model.value.toFixed(2));
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
        @input="mascaraMoeda"
        :value="isFocused ? model.toFixed(2) : getFormatValue()"
      />
    </NumberFieldContent>
  </NumberField>
</template>
