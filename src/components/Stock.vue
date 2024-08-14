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

interface IProduct {
    id_product: string
    name: string
    weight: number
    unit1: string
    price: number
    unit2: number
    quantity: number
    ingredientCost: number
    income: number
    revenue_cost: number
    profit: number
    price_per_unit: number
    chengeIncome?: number
}

interface IStockToPeriod {
    name: string,
    quantityCurrent: number
    necessaryAmount: number
    state: string | null
    quantityToBuy: number
}

export default {
    name: 'Stock',
    components: {
        NavBar
    },
    data() {
        return {
            allIngredients: [] as IIngredient[],
            allProducts: [] as IProduct[],
            stockToPeriod: [] as IStockToPeriod[],
            idUser: null as LocationQueryValue | LocationQueryValue[],
            quantityDays: 0
        }
    },
    async created() {
        this.getQuery()
        this.getAllIngredients()
        this.getProducts()
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
        async getProducts() {
            const { data } = await axios.get(urlApiBackEnd + '/product', {
                params: { idUser: this.idUser },
                withCredentials: true
            })
            this.allProducts = data
        },
        async updateTotalInStock(index: number) {
            const calculateTotalCash = this.allIngredients[index].price * this.allIngredients[index].quantity_in_stock
            this.allIngredients[index].total_cash_in_stock = parseFloat(calculateTotalCash.toFixed(2))
            await axios.patch(urlApiBackEnd + '/product/ingredient/stock', this.allIngredients[index])
        },
        updateQuantityDays(value: number) {
            if (value === 0) this.quantityDays = 7
            else this.quantityDays = 30
        },
        inputUpdateQuantityDays(event: any) {
            const value = event.target.value
            this.quantityDays = parseInt(value)
        },
        async sendDatasToCalculate() {
            if (this.quantityDays === 0) {
                alert('Por favor especifique um período.')
                return
            }
            const formateDatas = { allProducts: this.allProducts, allIngredients: this.allIngredients, quantityDays: this.quantityDays }

            const calculateDatas = await axios.post(urlApiBackEnd + '/stock', formateDatas)

            await calculateDatas.data.map((it: IStockToPeriod) => {
                if (it.state === 'inStock') {
                    it.state = 'Em estoque'
                } else if (it.state === 'insufficient') {
                    it.state = 'Estoque insuficiente'
                } else {
                    it.state = 'Não tem estoque'
                }
            })
            this.stockToPeriod = calculateDatas.data
        },
        updateIncome(event: any, index: number) {
            this.allProducts[index].chengeIncome = parseInt(event.target.value)
        }
    }
}
</script>

<template>
    <NavBar :showButtonAddCategory=false />
    <div class="container">
        <table class="all-ingredient">
            <thead>
                <tr>
                    <th colspan="5">Controle de estoque</th>
                </tr>
                <tr>
                    <th>Ingrediente</th>
                    <th>Peso</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Total R$ em estoque</th>
                </tr>
            </thead>
            <tbody class="stock-control">
                <tr v-for="(ingredient, index) in allIngredients" :key="index">
                    <td>{{ ingredient.name }}</td>
                    <td>{{ ingredient.weight }}</td>
                    <td>R$ {{ ingredient.price }}</td>
                    <td class="table-number"><input type="number" v-model="ingredient.quantity_in_stock"
                            @change="updateTotalInStock(index)">
                    </td>
                    <td class="table-number">R$ {{ ingredient.total_cash_in_stock }}</td>
                </tr>
            </tbody>
        </table>
        <div class="calculate-container">
            <table>
                <thead>
                    <tr>
                        <th colspan="3">Calcular estoque por periodo.</th>
                    </tr>
                    <tr>
                        <th colspan="3">
                            <div class="specification-period">
                                <button @click="updateQuantityDays(0)">Semanal</button>
                                <button @click="updateQuantityDays(1)">Mensal</button>
                                <input type="number" @change="inputUpdateQuantityDays">
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Dias</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in allProducts" :key="index">
                        <td>{{ product.name }}</td>
                        <td class="table-number">
                            <input v-if="product.chengeIncome" type="number" :value="product.chengeIncome"
                                @change="(event) => updateIncome(event, index)">
                            <input v-else type="number" :value="product.income"
                                @change="(event) => updateIncome(event, index)">
                        </td>
                        <td class="table-number">{{ quantityDays }}</td>
                    </tr>
                </tbody>
            </table>
            <button @click="sendDatasToCalculate" class="btn-calculate">Calcular</button>
            <div class="container-result">
                <table class="table-result">
                    <thead>
                        <tr>
                            <th colspan="5">Resultado</th>
                        </tr>
                        <tr>
                            <th>Ingrediente</th>
                            <th>Quantidade em estoque</th>
                            <th>Quantidade necessária</th>
                            <th>Status</th>
                            <th>Comprar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(ingredient, index) in stockToPeriod" :key="index">
                            <td>{{ ingredient.name }}</td>
                            <td class="table-number">{{ ingredient.quantityCurrent }}</td>
                            <td class="table-number">{{ ingredient.necessaryAmount }}</td>
                            <td v-if="ingredient.state === 'Em estoque'" style="color: green;">{{ ingredient.state }}
                            </td>
                            <td v-else-if="ingredient.state === 'Não tem estoque'" style="color: red;">{{
                                ingredient.state }}</td>
                            <td v-else style="color: blue;">{{ ingredient.state }}</td>
                            <td class="table-number">{{ ingredient.quantityToBuy }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.calculate-container table {
    width: 45vw;
}

table {
    width: 50%;
    border-collapse: collapse;
    font-size: 1em;
    border: 1px solid rgb(128, 149, 199);
    border-radius: 5px;
}

thead tr {
    background-color: rgb(128, 149, 199);
    color: white;
    font-weight: bold;
    text-align: center;
}

tbody tr {
    height: 2em;
    border-bottom: 1px solid #c8cacc;
}

.table-number {
    text-align: center;
}

.specification-period {
    display: flex;
    justify-content: space-around;
}

.specification-period button {
    background-color: white;
    width: 10em;
    font-size: 0.9em;
    border-radius: 5px;
    border: 1px solid rgb(128, 149, 199);
    transition: 0.8s;
    cursor: pointer;
}

.specification-period button:hover {
    background-color: #d4d6db;
}

.specification-period input {
    width: 10em;
    font-size: 0.9em;
    border-radius: 5px;
    border: 1px solid rgb(128, 149, 199);
    padding-left: 0.5em;
}

tbody tr:hover {
    box-shadow: 1px 1px 5.5px #8b8b8b;
}

tbody tr:nth-of-type(even) {
    background-color: #e0e2e475;
}

tbody tr:last-of-type {
    border-bottom: 2px solid rgb(72, 85, 117);
}

tbody tr input {
    width: 20%;
    border-radius: 5px;
    background-color: transparent;
    border: 1.5px solid #4c5b7c;
    font-size: 1em;
    outline: none;

}

.btn-calculate {
    width: 100%;
    height: 2em;
    border: 1px solid white;
    background-color: rgb(128, 149, 199);
    color: white;
    font-size: 1em;
    border-radius: 5px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    transition: 0.8s;
}

.btn-calculate:hover {
    background-color: #0c2b6e;
}

.container-result {
    width: 100%;
    height: 40vh;
    overflow-x: auto;
}

.table-result {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
}

.table-result thead {
    position: sticky;
    top: 0;
}
</style>