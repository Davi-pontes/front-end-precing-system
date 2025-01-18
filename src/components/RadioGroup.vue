<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { IPaymentMethodParams } from '@/interface/PaymentMethod';
import { ref, watch } from 'vue';

const props = defineProps<{
  items: IPaymentMethodParams[]
  modelValue?: string
}>()
const emit = defineEmits<{
  (event: 'paymentMethodSelected', value: IPaymentMethodParams) : void
  (event: 'update:modelValue', value: string): void
}>()
const selectedPayment = ref(props.modelValue || '')

// Sincroniza o valor interno com o prop modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    selectedPayment.value = newValue || ''
  }
)

// Emite eventos sempre que o valor mudar
watch(selectedPayment, (newValue) => {
  emit('update:modelValue', newValue) // Atualiza o v-model no pai
  const selectedItem = props.items.find((item) => item.value === newValue)
  if (selectedItem) {
    emit('paymentMethodSelected', selectedItem) // Dispara o evento personalizado
  }
})
</script>

<template>
  <RadioGroup  v-model="selectedPayment" :items="items">
    <div v-for="item in items" :key="item.id" class="flex items-center space-x-2">
      <RadioGroupItem :id="`payment-${item.id}`" :value="item.value" />
      <Label :for="`payment-${item.id}`" class="font-normal">
        {{ item.label }} (Taxa: R$ {{ item.tax }})
      </Label>
    </div>
  </RadioGroup>
</template>