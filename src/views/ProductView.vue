<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import TableComponent from '@/components/Table.vue'
import TagInput from '@/components/TagInput.vue'
import MessageAlert from '@/components/MessageAlert.vue'
import MessageError from '@/components/MessageError.vue'
import { onMounted, ref } from 'vue';
import { columnsProduct } from '@/components/ColumnsProduct'
import { HttpGetCategory } from '@/http/category/get-category';
import type { ICategory, ICategoryWithProducts } from '@/interface/Category';
import type { IProduct } from '@/interface/Product';
import { getUserIdLocalStorage } from '@/composables/getUserId';
import { useRouter } from 'vue-router';
import { HttpDeleteProduct } from '@/http/product/delete-product';

const router = useRouter()

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

const httpGetCategory = new HttpGetCategory(axios, urlApiBackEnd)
const httpDeleteProduct = new HttpDeleteProduct(axios, urlApiBackEnd)

const messageForError = ref('')
const showMessageErro = ref(false)
const messageForAlert = ref('')
const showMessageAlert = ref(false)

const idUser = ref('')
const productToRender = ref<IProduct[]>([])
const allCategoryAndProducts = ref<ICategoryWithProducts>({
    category: [],
    products: [],
    totalProducts: 0,
    averageProfit: 0
})

// Função para mostrar alertas de error
function handleError(message: string) {
    messageForError.value = message
    showMessageErro.value = true
}
// Função para remover alertas de erro
function removeAlertError() {
    showMessageErro.value = false
}
// Função para mostrar alertas
function handleAlert(message: string) {
    messageForAlert.value = message
    showMessageAlert.value = true
}
// Função para remover alertas
function removeAlert() {
    showMessageAlert.value = false
}
async function getAllCategoryAndProduct(): Promise<void> {
    try {
        const data = await httpGetCategory.getAllCategoryAndProduct(idUser.value)

        if (data) {
            allCategoryAndProducts.value = data
            productToRender.value = allCategoryAndProducts.value.products
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            handleError(error.response?.data)
        } else {
            handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
        }
    }
}
function handleUpdate(data: any) {
    handleRedirection(data)
}
async function handleDelete(dataToDeleted: any) {
    try {
        const data = await httpDeleteProduct.deleteProduct(dataToDeleted.id_product)

        if (data) {
            productDeletedUpdateData(data)
            handleAlert('Produto deletado com sucesso!')
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            handleError(error.response?.data)
        } else {
            handleError('Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.')
        }
    }
}
function productDeletedUpdateData(data: any) {
    productToRender.value = allCategoryAndProducts.value.products.filter(
        (it) => it.id_product !== data.id_product
    )
}
//Metodo que leva usuario pra ver os detalhes do produto
function handleDetail(data: any) {
  handleRedirection(data)
}
//Método que valida pra qual rota levar o usuario e redirecionar ele
function handleRedirection(data: any) {
    if (data && data.only === 1) {
        router.push({
            path: 'product/add',
            query: {
                id: idUser.value,
                idP: data.id_product
            }
        })
    } else {
        router.push({
            path: '/register',
            query: {
                idU: idUser.value,
                idP: data.id_product
            }
        })
    }
}
//Metodo para filtra produtos com base na categoria selecionada no tag input
function filterProductByCategory(categories: ICategory[]) {
    if (categories.length === 0) {
        productToRender.value = allCategoryAndProducts.value.products
    } else {
        productToRender.value = allCategoryAndProducts.value.products.filter(
            (product) => categories.some((category: ICategory) => category.id === product.id_category)
        )
    }
}
onMounted(() => {
    idUser.value = getUserIdLocalStorage()
    getAllCategoryAndProduct()
})
</script>

<template>
    <div class="w-full h-full border shadow-lg rounded-md p-4 mt-7">
        <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
        <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="removeAlertError" />
        <TagInput :label="'Categorias'" :description="'Filtre os produtos de acordo com as categorias.'"
            @filter="filterProductByCategory" v-model="allCategoryAndProducts.category" />
        <TableComponent :columns="columnsProduct" :data-props="productToRender"
            :informationsInputSearch="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }"
            @update="handleUpdate" @delete="handleDelete" @detail="handleDetail">
        </TableComponent>
    </div>
</template>