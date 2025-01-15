<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { IPaymentMethodParams } from '@/interface/PaymentMethod';
import { ref, watch } from 'vue';

const props = defineProps<{
  items: IPaymentMethodParams[]
}>()
const emit = defineEmits<{
  (event: 'paymentMethodSelected', value: IPaymentMethodParams) : void
}>()
const selectedPayment = ref('')

watch(selectedPayment, (newValue) => {
  const selectedItem = props.items.find((item) => item.value === newValue)
  if (selectedItem) {
    emit('paymentMethodSelected', selectedItem)
  }
})
</script>

<template>
  <RadioGroup  v-model="selectedPayment">
    <div v-for="item in items" :key="item.id" class="flex items-center space-x-2">
      <RadioGroupItem :id="`payment-${item.id}`" :value="item.value" />
      <Label :for="`payment-${item.id}`" class="font-normal">
        {{ item.label }} (Taxa: R$ {{ item.tax }})
      </Label>
    </div>
  </RadioGroup>
</template>