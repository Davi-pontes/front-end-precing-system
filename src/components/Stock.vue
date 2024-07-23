<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
import '../assets/stock.css'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

interface IIngredient {
    id: number,
    name: string,
    weight: number,
    unit1: string,
    price: number,
    quantity: number,
    unit2: string,
    ingredient_cost: number,
    id_product: string
    quantity_in_stock: number
    total_cash_in_stock: number
}

export default {
    name: 'Stock',
    components: {
        NavBar
    },
    data() {
        return {
            allIngredients: [] as IIngredient[]
        }
    },
    async created() {
        const getAllIngredients = await axios.get(urlApiBackEnd + '/product/ingredient/all')
        this.allIngredients = getAllIngredients.data
    },
    methods: {
        async updateTotalInStock(index: number) {
            const calculateTotalCash = this.allIngredients[index].price * this.allIngredients[index].quantity_in_stock
            this.allIngredients[index].total_cash_in_stock = parseFloat(calculateTotalCash.toFixed(2))
            await axios.patch(urlApiBackEnd + '/product/ingredient/stock', this.allIngredients[index])
        }
    }
}
</script>

<template>
    <main>
        <NavBar :showButtonAddCategory=false />
        <table class="content-table">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Peso</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Total R$ em estoque</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(ingredient, index) in allIngredients" :key="index">
                    <td>{{ ingredient.name }}</td>
                    <td>{{ ingredient.weight }}</td>
                    <td>R$ {{ ingredient.price }}</td>
                    <td><input type="number" v-model="ingredient.quantity_in_stock" @change="updateTotalInStock(index)">
                    </td>
                    <td>{{ ingredient.total_cash_in_stock }}</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>