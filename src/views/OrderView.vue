<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import Combobox from '@/components/Combobox.vue';
import axios from 'axios';
import { useRoute } from 'vue-router'
import { ref } from 'vue';
import type { ICommandItem } from '@/interface/Combobox';
import type { IProduct } from '@/interface/Product';

const urlComunicationBackEnd = import.meta.env.VITE_API_BACKEND

const route = useRoute()
const idUser = route.query.id
const dataFormatedToComboBox = ref<ICommandItem[]>([])
const itemsSelected = ref<IProduct[]>([])
const allUserProducts = ref<IProduct[]>([])
const paymentMethodFormatedToComboBox = ref([])
const paymentMethod = ref([])
const productQuantiry = 0

const typeTranslations: Record<string, string> = {
    money: 'Dinheiro',
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    ticket: 'Boleto',
    pix: 'Pix',
};

async function getAllProductByIdUser() {
    try {
        const { data } = await axios.get(urlComunicationBackEnd + '/product', {
            params: { idUser }
        })
        allUserProducts.value = data

        formatedDataToCombobox(allUserProducts.value)
    } catch (error) {
        console.error('Error ao buscar produtos')
    }
}
async function getPaymentMethodByIdUser() {
    const { data } = await axios.get(urlComunicationBackEnd + '/payment/method', {
        params: { idUser }
    })
    paymentMethod.value = data
    formatedTypePayment(data)
}
function formatedDataToCombobox(data: IProduct[]) {
    dataFormatedToComboBox.value = data.map((item: any) => {
        return { value: item.id_product, label: item.name }
    })
}
function formatedTypePayment(methods: any) {
    const formattedMethods = methods.map((method: any) => ({
        value: method.type,
        label: typeTranslations[method.type] || 'Desconhecido', // Adiciona tradução
    }));
    paymentMethodFormatedToComboBox.value = formattedMethods
}
function handleItemSelected(item: ICommandItem) {
    const itemInAlluserProduct = allUserProducts.value.find((it) => it.id_product === item.value)

    if (itemInAlluserProduct) itemsSelected.value.push({...itemInAlluserProduct, quantity: 1})
}
function handlePaymentMehotdSelected(item: ICommandItem) {
    console.log(paymentMethod.value);

    const paymentSelected = paymentMethod.value.find((it:any) => it.type === item.value)

    console.log(paymentSelected);
}
getAllProductByIdUser()
getPaymentMethodByIdUser()
</script>

<template>
    <NavBar :showButtonAddCategory="false"></NavBar>
    <div class="w-[90%] h-[30em] border shadow-lg">
        <div class="flex w-full h-[3em] gap-4">
            <Combobox :titleInput="'Selecione um produto...'" :titleSearch="'Pesquise um produto...'"
                :items="dataFormatedToComboBox" @itemSelected="handleItemSelected">
            </Combobox>
            <!-- <input class="w-[7em] h-[2em] border shadow-sm" type="number" placeholder="Adicione uma quantidade"
                v-model="productQuantiry"> -->
        </div>
        <div class="flex flex-col w-full h-[15em]">
            <ul class="flex w-full justify-around" v-for="item of itemsSelected" :key="item.id_product">
                <li>{{ item.name }}</li>
                <input class="w-[7em] h-[2em] border shadow-sm" type="number" placeholder="Adicione uma quantidade"
                v-model="item.quantity">
                <li>{{ item.price_per_unit }}</li>
            </ul>
        </div>
        <Combobox :titleInput="'Selecione uma forma de pagamento...'"
                :titleSearch="'Pesquise uma forma de pagamento...'" :items="paymentMethodFormatedToComboBox"
                @itemSelected="handlePaymentMehotdSelected">
            </Combobox>
    </div>
    <h1>Pedido</h1>
</template>