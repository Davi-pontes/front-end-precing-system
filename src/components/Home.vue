<script lang="ts">
import '../assets/home.css'
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
import AddCategory from './AddCategory.vue'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
interface IProduct {
    category: {
        id: string | null
        name: string
    }
    products: {
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
    }[]
}
export default {
    name: 'Home',
    components: {
        NavBar,
        AddCategory
    },
    data() {
        return {
            allProduct: [] as IProduct[],
            showAddCategory: false
        }
    },
    created() {
        console.log(urlApiBackEnd);

        this.getAllProduct()

    },
    methods: {
        async getAllProduct() {
            await axios.get(urlApiBackEnd + '/category').then((response) => {
                this.allProduct = response.data
            }).catch()
        },
        goToEdit(idProduct: string, idCategory: string | null): void {
            this.$router.push({ name: 'precification', query: { idC: idCategory, idP: idProduct } })
        },
        goToAddProductCategory(idCategory: string | null): void {
            this.$router.push({ name: 'precification', query: { idC: idCategory } })
        },
        addNewCategory(): void {
            this.showAddCategory = true
        },
        updateCategory(newCategory: object): void {
            this.allProduct.unshift({
                category: newCategory,
                products: []
            } as IProduct
            )
            this.closeAddNewCategory()
        },
        closeAddNewCategory(): void {
            this.showAddCategory = false
        },
        async deleteProduct(id_product: string, index: number) {
            await axios.delete(urlApiBackEnd + "/product", {
                params: {
                    id: id_product
                }
            }).then(() => {
                const indexTheDataDeleted = this.allProduct[index].products.findIndex(it => it.id_product === id_product)

                this.allProduct[index].products.splice(indexTheDataDeleted, 1)
            }).catch()
        }

    }
}
</script>

<template>
    <main>
        <NavBar :showButtonAddCategory=true @newCategory="addNewCategory" v-if="!showAddCategory" />
        <AddCategory v-if="showAddCategory" @updateCategory="updateCategory" />
        <div class="welcome" v-if="allProduct.length === 0">
            <span>Adicione uma categoria</span>
        </div>
        <div class="main" v-for="(categoryAndProducts, indexCategory) of allProduct" :key="indexCategory">
            <div class="name-category">
                <p>
                    {{ categoryAndProducts.category.name }}
                </p>
                <button @click="goToAddProductCategory(categoryAndProducts.category.id)">Adicionar produto</button>
            </div>
            <table tyle="width:100%">
                <tr class="header-table">
                    <th colspan="2"></th>
                    <th>PRODUTO</th>
                    <th>RENDIMENTO</th>
                    <th>CUSTO TOTAL</th>
                    <th>LUCRO</th>
                    <th>PREÇO DE VENDA</th>
                </tr>
                <tr class="line-table" v-for="(product, indexProduct) of categoryAndProducts.products"
                    :key="indexProduct">
                    <td><button @click="goToEdit(product.id_product, categoryAndProducts.category.id)">Editar</button>
                    </td>
                    <td><button @click="deleteProduct(product.id_product, indexCategory)">Excluir</button>
                    </td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.income }}</td>
                    <td style="color: red;">R$ {{ product.revenue_cost }}</td>
                    <td style="color: green;">R$ {{ product.profit }}</td>
                    <td style="color: green;">R$ {{ product.price_per_unit }}</td>
                </tr>
            </table>
        </div>
    </main>
</template>