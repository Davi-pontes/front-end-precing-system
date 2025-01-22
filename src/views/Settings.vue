<script setup lang="ts">
import axios, { AxiosError } from 'axios';
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
import { useRoute } from 'vue-router';
import MessageAlert from '@/components/MessageAlert.vue';
import MessageError from '@/components/MessageError.vue';

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND;
const route = useRoute()
const showMessageAlert = ref(false);
const showMessageErro = ref(false);
const messageForAlert = ref('');
const messageForError = ref('');
const idUser = route.query.id

const paymentMethods = ref([
    { label: "Pix", tax: 0 },
    { label: "Cartão de crédito", tax: 0 },
    { label: "Cartão de débito", tax: 0 },
    { label: "Dinheiro", tax: 0 },
    { label: "Boleto", tax: 0 },
])
const typeTranslations: Record<string, string> = {
    money: 'Dinheiro',
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    ticket: 'Boleto',
    pix: 'Pix',
};
// Função para mostrar alertas de error
function handleError(message: string) {
    messageForError.value = message;
    showMessageErro.value = true;
}

// Função para remover alertas
function removeAlert() {
    showMessageAlert.value = false;
}
// Função para remover alertas de erro
function removeAlertError() {
    showMessageErro.value = false;
}
// Função para buscar todas categoria do usuario
async function getPaymentMethodByIdUser() {
    try {
        const { data } = await axios.get(urlApiBackEnd + "/payment/method", {
            params: { idUser: idUser },
        });
        formatedTypePayment(data)
    } catch (error) {
        if (error instanceof AxiosError) {
            handleError(error.response?.data);
        } else {
            handleError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
        }
    }
}
function formatedTypePayment(methods: any) {
    const formattedMethods = methods.map((method: any) => ({
        id: method.id,
        value: method.type,
        label: typeTranslations[method.type] || 'Desconhecido',
        tax: method.tax
    }));

    paymentMethods.value = formattedMethods
}
getPaymentMethodByIdUser()
</script>

<template>
    <div class="w-full">
        <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
        <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
        <Card>
            <CardHeader>
                <CardTitle>Formas de pagamento</CardTitle>
                <CardDescription>
                    Insira a taxa cobrada para cada forma de pagamento.
                </CardDescription>
            </CardHeader>
            <CardContent v-for="(payment, index) in paymentMethods" :key="index">
                <form class="flex justify-between gap-4 items-center">
                    <Input :placeholder="payment.label" disabled class="w-2/3" />
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
                                <NumberFieldIncrement />
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