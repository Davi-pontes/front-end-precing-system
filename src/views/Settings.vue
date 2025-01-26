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
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MessageAlert from '@/components/MessageAlert.vue';
import MessageError from '@/components/MessageError.vue';
import type { IPaymentMethod, IPaymentMethodParams } from '@/interface/PaymentMethod';

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND;
const route = useRoute()
const idUser = route.query.id
let isInitialLoad = true;

const showMessageAlert = ref<boolean>(false);
const showMessageErro = ref<boolean>(false);
const messageForAlert = ref<string>('');
const messageForError = ref<string>('');
const paymentMethodAltered = ref<IPaymentMethodParams[]>([])
const paymentMethods = ref<IPaymentMethodParams[]>([])

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
// Função para mostrar alertas
function handleAlert(message: string) {
    messageForAlert.value = message;
    showMessageAlert.value = true;
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
async function sendPaymentMethodsToUpdate() {
    try {
        const paymentMethodsAlteredAndFormated = formatedTypePaymentToSendBackEnd()

        const { data } = await axios.put(urlApiBackEnd + "/payment/method",
            { paymentMethods: paymentMethodsAlteredAndFormated }, {
            params: { idUser: idUser },
            withCredentials: true
        });
        if(data.length > 0){
            handleAlert('Taxas de pagamento alteradas com sucesso!')
            paymentMethodAltered.value = []
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            handleError(error.response?.data);
        } else {
            handleError("Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.");
        }
    }
}
function formatedTypePayment(methods: IPaymentMethod[]) {
    const formattedMethods = methods.map((method: IPaymentMethod) => ({
        id: method.id,
        value: method.type,
        label: typeTranslations[method.type] || 'Desconhecido',
        tax: method.tax
    }));

    paymentMethods.value = formattedMethods
}
function formatedTypePaymentToSendBackEnd(): IPaymentMethod[] {
    const formattedMethods = paymentMethods.value.map((method: IPaymentMethodParams) => ({
        id: method.id,
        type: method.value,
        tax: method.tax,
        status: 1
    }));

    return formattedMethods
}
function validateIfPaymentMethodsHasChanged() {
    if (paymentMethodAltered.value.length === 0) {
        handleError('Nenhum método de pagamento foi alterado!')
    } else {
        sendPaymentMethodsToUpdate()
    }
}
watch(
    () => paymentMethods.value,
    (newValue: IPaymentMethodParams[]) => {

        if (isInitialLoad) {
            isInitialLoad = false;
            return;
        }
        paymentMethodAltered.value = newValue
    },
    { deep: true }
);
getPaymentMethodByIdUser()
</script>

<template>
    <div class="w-full">
        <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
        <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
        <Card>
            <CardHeader>
                <CardTitle>Formas de pagamento</CardTitle>
                <CardDescription>
                    Insira a taxa cobrada para cada forma de pagamento.
                </CardDescription>
            </CardHeader>
            <CardContent v-for="(payment, index) in paymentMethods" :key="index">
                <form class="flex justify-between items-center">
                    <Input :placeholder="payment.label" disabled class="w-2/3" />
                    <div class="w-1/4">
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
            <CardFooter class="border-t px-6 py-4 flex justify-end">
                <Button class="bg-muted" @click="validateIfPaymentMethodsHasChanged()">Salvar</Button>
            </CardFooter>
        </Card>
    </div>
</template>