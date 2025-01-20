<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field'
import { ref } from 'vue';
const paymentMethods = ref([
    { name: "Pix", tax: 0 },
    { name: "Cartão de crédito", tax: 0 },
    { name: "Cartão de débito", tax: 0 },
    { name: "Dinheiro", tax: 0 },
])

</script>

<template>
    <div class="w-full">
        <Card>
            <CardHeader>
                <CardTitle>Formas de pagamento</CardTitle>
                <CardDescription>
                    Insira a taxa cobrada para cada forma de pagamento.
                </CardDescription>
            </CardHeader>
            <CardContent v-for="(payment, index) in paymentMethods" :key="index">
                <form class="flex justify-between gap-4 items-center">
                    <Input :placeholder="payment.name" disabled class="w-2/3" />
                    <div class="flex items-center w-1/3">
                        <NumberField id="balance" :min="0" :default-value="0" v-model="payment.tax" :format-options="{
                            style: 'currency',
                            currency: 'BRL',
                            currencyDisplay: 'symbol',
                            currencySign: 'accounting',
                        }">
                            <NumberFieldContent>
                                <NumberFieldDecrement />
                                <NumberFieldInput />
                                <NumberFieldIncrement/>
                            </NumberFieldContent>
                        </NumberField>
                    </div>
                </form>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
                <Button>Salvar</Button>
            </CardFooter>
        </Card>
    </div>
</template>