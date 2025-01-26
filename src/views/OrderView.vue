<script setup lang="ts">
import Combobox from '@/components/Combobox.vue';
import axios, { AxiosError } from 'axios';
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue';
import type { ICommandItem } from '@/interface/Combobox';
import type { IProduct } from '@/interface/Product';
import RadioGroup from '@/components/RadioGroup.vue';
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field'
import type { IPaymentMethodParams } from '@/interface/PaymentMethod';
import { Trash2 } from 'lucide-vue-next';
import { ChevronsUp } from 'lucide-vue-next';
import TableComponent from "@/components/Table.vue"
import { columnsOrder } from '@/components/ColumnsOrder';
import MessageAlert from '@/components/MessageAlert.vue';
import MessageError from '@/components/MessageError.vue';
import type { IOrder } from '@/interface/Order';

const urlComunicationBackEnd = import.meta.env.VITE_API_BACKEND

const route = useRoute()
const idUser = route.query.id
const dataFormatedToComboBox = ref<ICommandItem[]>([])
const itemsSelected = ref<IProduct[]>([])
const allUserProducts = ref<IProduct[]>([])
const allUserORder = ref<IOrder[]>([])
const paymentMethodFormatedToComboBox = ref([])
const paymentMethod = ref([])
const applyDiscount = ref(true)
const showMessageAlert = ref(false)
const selectedProduct = ref('');
const selectedPaymentMethod = ref('')
const messageErro = ref('')
const showError = ref(false)

const typeTranslations: Record<string, string> = {
    money: 'Dinheiro',
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    ticket: 'Boleto',
    pix: 'Pix',
};
const summaryOrder = ref({
    discount: 0,
    tax: 0,
    subTotal: 0,
    paymentMethod: '',
    total: 0
})
function handleError(message: string) {
    messageErro.value = message
    showError.value = true
}
function handleRemoveAlertError() {
    showError.value = false
    messageErro.value = ''
}
function clearVariable() {
    selectedPaymentMethod.value = ''
    selectedProduct.value = "";
    itemsSelected.value = []
    summaryOrder.value = {
        discount: 0,
        tax: 0,
        subTotal: 0,
        paymentMethod: '',
        total: 0
    }
}
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
async function getAllOrderByIdUser() {
    try {
        const { data } = await axios.get(urlComunicationBackEnd + '/order', {
            params: { idUser }
        })
        allUserORder.value = data
    } catch (error) {
        console.log(error);
    }
}
async function sendOrder() {
    try {
        const formatedSummaryOrderForSend = {
            discount: summaryOrder.value.discount,
            type_payment_method: summaryOrder.value.paymentMethod,
            tax: summaryOrder.value.tax,
            sub_total: summaryOrder.value.subTotal,
            total: summaryOrder.value.total,
            id_user: idUser
        }
        const formatedItemsSelectedForSend = itemsSelected.value.map((item) => {
            return { quantity: item.quantity, id_product: item.id_product }
        })
        const datasFormated = { orderItems: formatedItemsSelectedForSend, orderSummary: formatedSummaryOrderForSend }

        const { data } = await axios.post(urlComunicationBackEnd + '/order', datasFormated)
        allUserORder.value = [...allUserORder.value, data] as IOrder[]
        if (data) showMessageAlert.value = true
        clearVariable()
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            handleError(error.response?.data);
        }
    }

}
function formatedDataToCombobox(data: IProduct[]) {
    dataFormatedToComboBox.value = data.map((item: any) => {
        return { value: item.id_product, label: item.name }
    })
}
function formatedTypePayment(methods: any) {
    const formattedMethods = methods.map((method: any) => ({
        id: method.id,
        value: method.type,
        label: typeTranslations[method.type] || 'Desconhecido',
        tax: method.tax
    }));

    paymentMethodFormatedToComboBox.value = formattedMethods
}
function handleItemSelected(item: ICommandItem) {
    selectedProduct.value = item.label

    const productAlreadyAdded = itemsSelected.value.find((it) => it.id_product === item.value)

    if (productAlreadyAdded) {
        const index = itemsSelected.value.findIndex((it) => it.id_product === item.value);

        itemsSelected.value[index].quantity++
        itemsSelected.value[index].currentPrice = itemsSelected.value[index].price_per_unit * itemsSelected.value[index].quantity

        updateSubtotal(itemsSelected.value[index].price_per_unit)
    } else {
        const itemInAlluserProduct = allUserProducts.value.find((it) => it.id_product === item.value)

        if (itemInAlluserProduct) {
            itemsSelected.value.push({ ...itemInAlluserProduct, quantity: 1, currentPrice: itemInAlluserProduct.price_per_unit })
            updateSubtotal(itemInAlluserProduct.price_per_unit)
        }
    }
}
function updateSubtotal(value: number) {
    summaryOrder.value.subTotal += value
    updateTotal(value)
}
function updateTotal(value: number) {
    summaryOrder.value.total += value
}
function paymentMethodSelected(value: IPaymentMethodParams) {
    summaryOrder.value.tax = value.tax
    summaryOrder.value.paymentMethod = value.label
    updateTotal(value.tax)
}
function handleDiscount(event: Event) {
    const inputTarget = event.target as HTMLInputElement;

    applyDiscount.value = false

    if (inputTarget && inputTarget.value) {
        summaryOrder.value.discount += parseFloat(inputTarget.value)
        updateTotal(-inputTarget.value)
    }
}
function removerItem(item: IProduct) {
    const index = itemsSelected.value.findIndex(it => it.id_product === item.id_product)

    itemsSelected.value.splice(index, 1)
    updateSubtotal(-item.price_per_unit)
}
function decrement(item: IProduct) {
    const index = itemsSelected.value.findIndex((it) => it.id_product === item.id_product);

    itemsSelected.value[index].currentPrice = itemsSelected.value[index].price_per_unit * itemsSelected.value[index].quantity
    updateSubtotal(-item.price_per_unit)
}
function increment(item: IProduct) {
    const index = itemsSelected.value.findIndex((it) => it.id_product === item.id_product);

    itemsSelected.value[index].currentPrice = itemsSelected.value[index].price_per_unit * itemsSelected.value[index].quantity
    updateSubtotal(item.price_per_unit)
}
const qtyItemsInOrder = computed(() => {
    return itemsSelected.value.reduce((accumulator, item) => accumulator + item.quantity, 0)
})

getAllProductByIdUser()
getPaymentMethodByIdUser()
getAllOrderByIdUser()
</script>

<template>
    <MessageAlert v-if="showMessageAlert" :message="'Pedido feito com sucesso!'"
        @removeAlert="showMessageAlert = false" />
    <MessageError v-if="showError" :message="messageErro" @removeAlert="handleRemoveAlertError"/>
    <div class="flex flex-col w-full">
        <div class="flex w-full h-[32em] gap-2">
            <!-- Criaçao do pedido -->
            <div class="w-[75%] h-full border shadow-lg rounded-md p-4">
                <div class="flex w-full h-[3em] gap-4">
                    <Combobox :titleInput="'Selecione um produto...'" :titleSearch="'Pesquise um produto...'"
                        :items="dataFormatedToComboBox" v-model="selectedProduct" @itemSelected="handleItemSelected" />
                </div>
                <div class="w-full h-[1px] bg-slate-400"></div>
                <div class="flex flex-col w-full h-[15em]" v-if="itemsSelected.length > 0">
                    <ul class="flex w-full items-center justify-between gap-x-4 border-b pb-2 mt-1"
                        v-for="item of itemsSelected" :key="item.id_product">
                        <li class="w-[10em] truncate">{{ item.name }}</li>
                        <NumberField v-model="item.quantity" :min="0" class="border-none">
                            <NumberFieldContent class="border-none">
                                <NumberFieldDecrement class="border-none" @click.prevent="decrement(item)" />
                                <NumberFieldInput class="border-none" />
                                <NumberFieldIncrement class="border-none" @click="increment(item)" />
                            </NumberFieldContent>
                        </NumberField>
                        <li class="w-[5em] text-right">R$ {{ item.currentPrice.toFixed(2) }}</li>
                        <li class="w-[2em] text-red-500 text-center cursor-pointer" @click="removerItem(item)">
                            <Trash2 :size="20" />
                        </li>
                    </ul>
                </div>
                <div class="flex justify-center w-full h-[15em]" v-else>
                    <span class="opacity-25">Nenhum item adicionado.</span>
                </div>
                <div class="w-full h-[1px] bg-slate-400"></div>
                <div class="flex w-full gap-4">
                    <div>
                        <span>Selecione a forma de pagamento.</span>
                        <RadioGroup class="mt-2" :items="paymentMethodFormatedToComboBox" v-model="selectedPaymentMethod"
                            @paymentMethodSelected="paymentMethodSelected" />
                    </div>
                    <div class="flex flex-col">
                        <label for="discount">Adicione um desconto. (Opcional)</label>
                        <input id="discount" @change.prevent="handleDiscount" type="number" placeholder="Desconto"
                            class="border shadow-sm mt-2" />
                    </div>
                </div>
                <div class="flex w-full justify-end">
                    <button
                        class="flex items-center w-[10em] mt-2 border-2 rounded-md bg-[#8095c7] p-1 text-white hover:bg-transparent hover:text-gray-500 transition-[0.4s]"
                        @click="sendOrder()">
    
                        <ChevronsUp class="mr-2 text-white hover:text-gray-500" /> Enviar pedido
                    </button>
                </div>
            </div>
            <div class="flex flex-col w-[25%] h-[17em] border shadow-lg bg-gray-200 rounded-md p-4">
                <span class="text-lg mb-2">Resumo do pedido</span>
    
                <div class="w-full h-[1px] bg-slate-400"></div>
    
                <div class="flex flex-col w-full gap-y-2">
                    <div class="flex justify-between">
                        <span class="opacity-40">Desconto</span>
                        <span>R$ {{ summaryOrder.discount.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="opacity-40">Taxa</span>
                        <span>R$ {{ summaryOrder.tax.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="opacity-40">Sub total</span>
                        <span>R$ {{ summaryOrder.subTotal.toFixed(2) }}</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="opacity-40">Qtd items</span>
                        <span>{{ qtyItemsInOrder }}</span>
                    </div>
                </div>
                <div class="w-full h-[1px] bg-slate-400"></div>
                <div class="flex justify-between mt-2">
                    <span class="opacity-40">Total</span>
                    <span>R$ {{ summaryOrder.total.toFixed(2) }}</span>
                </div>
            </div>
        </div>
        <div class="w-full border shadow-lg rounded-md p-4 mt-7">
            <span class="text-lg font-semibold">Vendas.</span>
            <TableComponent :columns="columnsOrder" :dataProps="allUserORder"
                :informationsInputSearch="{ placeHolder: 'Filtre pelo número do pedido.', searchProperty: 'id' }">
            </TableComponent>
        </div>
    </div>
</template>