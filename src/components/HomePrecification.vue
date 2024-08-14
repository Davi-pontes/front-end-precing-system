<script lang="ts">
import NavBar from '@/components/NavBar.vue'
import axios from 'axios';
import AddCategory from './AddCategory.vue'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
interface IProduct {
    category: {
        id: string | null
        name: string
        user_id: string
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
    name: 'HomePrecification',
    components: {
        NavBar,
        AddCategory
    },
    data() {
        return {
            allProduct: [] as IProduct[],
            showAddCategory: false,
            nameUser: null,
            idUser: null
        }
    },
    created() {
        this.getLocalStorage()
        this.getAllProduct()
    },
    methods: {
        getLocalStorage() {
            const localStorageObject = JSON.parse(localStorage.getItem('User'))
            this.nameUser = localStorageObject.name
            this.idUser = localStorageObject.id
        },
        async getAllProduct() {
            const { data } = await axios.get(urlApiBackEnd + '/category', {
                params: { idUser: this.idUser },
                withCredentials: true
            })

            this.allProduct = data
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
        },
        closeAddCategory() {
            this.showAddCategory = false
        }

    }
}
</script>

<template>
    <main>
        <NavBar :showButtonAddCategory=true @newCategory="addNewCategory" v-if="!showAddCategory" />
        <AddCategory v-if="showAddCategory" :nameUser="nameUser" :idUser="idUser" @updateCategory="updateCategory"
            @cancelAddNewCategory="closeAddCategory" />
        <div class="welcome" v-if="allProduct.length === 0">
            <button @click="addNewCategory">Adicione uma categoria</button>
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
                    <td><button
                            @click="goToEdit(product.id_product, categoryAndProducts.category.id)">Visualizar</button>
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

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header-table {
    font-size: 0.9em;
}

.welcome {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.welcome button {
    border: 1px solid rgb(128, 149, 199);
    background-color: transparent;
    border-radius: 5px;
    padding: 5px;
    font-size: 1.5em;
    color: #d1cece;
    cursor: pointer;
    transition: 0.8s;
}

.welcome button:hover {
    background-color: transparent;
    color: black;
}

.name-category {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 1.3em;
    height: 2em;
    background: linear-gradient(120deg, rgb(65, 81, 117), rgb(231, 231, 231));
    color: white;
}

.name-category p {
    width: 13em;
    margin-left: 1em;
    overflow: hidden;
}

.name-category button {
    border: none;
    width: 10em;
    height: 2em;
    font-size: 13px;
    margin-right: 5em;
    transition: 0.5s;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid white;
    color: white;
    margin-left: 10em;
    cursor: pointer;
}

.name-category button:hover {
    background-color: white;
    color: black;
}

.line-table button {
    width: 10em;
    font-size: 0.8em;
    border-radius: 5px;
    background-color: transparent;
    padding: 5px;
    cursor: pointer;
    border: 2px solid rgb(179, 175, 175);
}

th {
    width: 18%;
}

tr td {
    text-align: center;
    border-bottom: 1px solid #c8cacc;
}

tr:hover {
    box-shadow: 1px 1px 5.5px #8b8b8b;
}
</style>