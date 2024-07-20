<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
import '../assets/allIngredients.css'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

interface IAllIngredient {
    id: number,
    name: string,
    weight: number,
    unit1: string,
    price: number,
    quantity: number,
    unit2: string,
    ingredient_cost: number,
    id_product: string
}

export default {
    name: "AllIngredients",
    components: {
        NavBar
    },
    data() {
        return {
            allIngredients: [] as IAllIngredient[]
        }
    },
    async created() {
        const getAllIngredients = await axios.get(urlApiBackEnd + '/product/ingredient/all')
        this.allIngredients = getAllIngredients.data
    },
    methods: {
        async updateProductIngredient(datas: IAllIngredient) {
            console.log(datas);

            await axios.patch(urlApiBackEnd + "/product/ingredient/specific", {
                id: datas.id,
                price: datas.price
            })

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

<style></style>