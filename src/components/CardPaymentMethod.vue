<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput
} from '@/components/ui/number-field'
import type { IPaymentMethodParams } from '@/interface/PaymentMethod'
import { ref, watch } from 'vue';

let isInitialLoad = true
const paymentMethodAltered = ref<IPaymentMethodParams[]>([])

function validateIfPaymentMethodsHasChanged() {
  if (paymentMethodAltered.value.length === 0) {
    emit("update", paymentMethodAltered.value)
  }
}
const props = defineProps<{
    paymentMethods: IPaymentMethodParams[]
}>()
const emit = defineEmits(["update"])
watch(
  () => props.paymentMethods,
  (newValue: IPaymentMethodParams[]) => {
    if (isInitialLoad) {
      isInitialLoad = false
      return
    }
    paymentMethodAltered.value = newValue
  },
  { deep: true }
)
</script>

<template>
    <Card>
      <CardHeader>
        <CardTitle>Formas de pagamento</CardTitle>
        <CardDescription> Insira a taxa cobrada para cada forma de pagamento. </CardDescription>
      </CardHeader>
      <CardContent v-for="(payment, index) in paymentMethods" :key="index">
        <form class="flex justify-between items-center">
          <Input :placeholder="payment.label" disabled class="w-2/3" />
          <div class="w-1/4">
            <NumberField
              id="balance"
              :min="0"
              :default-value="0"
              v-model="payment.tax"
              :format-options="{
                style: 'currency',
                currency: 'BRL',
                currencyDisplay: 'symbol',
                currencySign: 'accounting'
              }"
            >
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </div>
        </form>
      </CardContent>
      <CardFooter class="border-t px-6 py-4 flex justify-end">
        <Button class="bg-muted" @click="validateIfPaymentMethodsHasChanged()">Salvar</Button>
      </CardFooter>
    </Card>
</template>