<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import TableComponent from "@/components/Table.vue"
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import { columnsStockProduct } from '@/components/ColumnsStockProduct';
import type { IStockProduct } from '@/interface/Stock';
const urlComunicationBackEnd = import.meta.env.VITE_API_BACKEND

const route = useRoute()
const idUser = route.query.id
const allProductStockByUser = ref<IStockProduct[]>([])

async function getStockAllProductByIdUser() {
    try {
        const { data } = await axios.get(urlComunicationBackEnd + '/stock', {
            params: { idUser }
        })
        allProductStockByUser.value = data

    } catch (error) {
        console.error('Error ao buscar produtos')
    }
}
getStockAllProductByIdUser()
</script>

<template>
    <NavBar/>
    <h1>Estoque de produto</h1>
    <TableComponent 
    :columns="columnsStockProduct"
    :data-props="allProductStockByUser"
    :informations-input-search="{placeHolder:'Filtre por nome.', searchProperty:'name'}">
    </TableComponent>
</template>