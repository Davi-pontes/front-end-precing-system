<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
import type { LocationQueryValue } from 'vue-router';

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
    name: "AllIngredients",
    components: {
        NavBar
    },
    data() {
        return {
            allIngredients: [] as IIngredient[],
            idUser: null as LocationQueryValue | LocationQueryValue[]
        }
    },
    async created() {
        this.getQuery()
        this.getAllIngredients()
    },
    methods: {
        getQuery() {
            this.idUser = this.$route.query.id;
        },
        async getAllIngredients() {
            const { data } = await axios.get(urlApiBackEnd + '/product/ingredient/all', {
                params: { idUser: this.idUser },
                withCredentials: true
            })
            this.allIngredients = data
        },
        async updateProductIngredient(datas: IIngredient) {
            await axios.patch(urlApiBackEnd + "/product/ingredient/specific", datas)
        }
    }
}
</script>

<template>
    <main>
        <NavBar :showButtonAddCategory=false />
        <div class="showAllIngredients">
            <table class="content-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Unidade</th>
                        <th>Peso</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(ingredient, index) in allIngredients" :key="index">
                        <td>{{ ingredient.name }}</td>
                        <td>{{ ingredient.unit1 }}</td>
                        <td>{{ ingredient.weight }}</td>
                        <td>R$ <input type="number" v-model="ingredient.price"
                                @change="updateProductIngredient(ingredient)"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </main>
</template>

<style scoped>
.content-table {
    border-collapse: collapse;
    font-size: 1em;
}


.content-table thead tr {
    background-color: #4c5b7c;
    color: white;
    font-weight: bold;
    position: sticky;
    top: 0;
}

.content-table th {
    width: 18%;
}

.content-table th,
.content-table td {
    padding: 12px 15px;
}

.content-table tbody tr {
    border-bottom: 1px solid #c8cacc;
}

.content-table tbody tr:hover {
    box-shadow: 1px 1px 5.5px #8b8b8b;
}

.content-table tbody tr:nth-of-type(even) {
    background-color: #e0e2e475;
}

.content-table tbody tr:last-of-type {
    border-bottom: 2px solid rgb(72, 85, 117);
}

.content-table tbody tr input {
    background-color: transparent;
    border: none;
    border-bottom: 1.5px solid #4c5b7c;
    font-size: 1em;
    outline: none;

}

.content-table tbody tr input[type=number]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

.content-table tbody tr input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>