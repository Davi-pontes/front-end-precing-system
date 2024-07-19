<script lang="ts">
import '../assets/precification.css';
import axios from 'axios';

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
interface Ingredient {
    name: string | null;
    weight: number | 0;
    unit1: string;
    price: number | 0;
    unit2: string | null;
    quantity: number | 0;
    ingredient_cost: number | 0;
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
}

export default {
    data() {
        return {
            costOfIngredient: 0,
            operationalCost: 0,
            fixedCost: 0,
            profit: 0,
            profitPecentage: 0,
            priceFinalRevenue: 0,
            income: 0,
            recipeTime: 0,
            pricePerUnit: 0,
            costOfRevenue: 0,
            labor: 0,
            isJoker: 0,
            nameProduct: "",
            id_product: null as string | null,
            id_category: null as string | null,
            structureIngredient: { name: null, weight: 0, unit1: null, price: 0, unit2: null, quantity: 0, ingredient_cost: 0 },
            all: [] as Ingredient[],
            productsJoker: [] as IProduct[],
            productJokerSelected: {} as IProduct
        }
    },
    async created() {
        this.controllerCreated()
    },
    methods: {
        controllerCreated() {
            if (this.$route.query.idP) {
                this.getQueryIdProduct()
                this.getQueryIdCategory()
                this.getProduct()
                this.getProductIngredient()
                this.getProducsJoker()
            } else {
                this.getQueryIdCategory()
                this.getProducsJoker()
            }
        },
        updateAllNumbers() {
            this.calculateCostOfIngredient()
            this.calculateCostFixed()
            this.calculateProfit()
            this.calculateFinalRevenuePrice()
            this.calculatePricePerUnit()
            this.calculateCostOfRevenue()
        },
        calculateCostOfIngredient(): void {
            if (this.all) {
                const totalCost = this.all.reduce((acc, data) => acc + data.ingredient_cost, 0);
                this.costOfIngredient = totalCost;
            }
        },
        calculateCostFixed(): void {
            const result = this.costOfIngredient * this.operationalCost / 100
            this.fixedCost = parseFloat(result.toFixed(2))
        },
        calculateProfit(): void {
            const resultCalculateProfit = (this.costOfIngredient + this.fixedCost) * this.profitPecentage / 100

            this.profit = parseFloat(resultCalculateProfit.toFixed(2))
        },
        calculateFinalRevenuePrice(): void {
            const resultCalculatepriceFinalRevenue = this.costOfIngredient + this.fixedCost + this.profit

            this.priceFinalRevenue = parseFloat(resultCalculatepriceFinalRevenue.toFixed(2))
        },
        calculatePricePerUnit(): void {
            const resultCalculatePricePerUnit = this.priceFinalRevenue / this.income

            this.pricePerUnit = parseFloat(resultCalculatePricePerUnit.toFixed(2))
        },
        calculateCostOfRevenue(): void {
            const resultCalculateCostOfRevenue = this.costOfIngredient + this.fixedCost

            this.costOfRevenue = parseFloat(resultCalculateCostOfRevenue.toFixed(2))
        },
        addNewIngredient(): void {
            const newIngredient = { name: null, weight: 0, unit1: 'Selecione', price: 0, unit2: 'Selecione', quantity: 0, ingredient_cost: 0 }
            this.all.push(newIngredient)
        },
        addProductJoker(): void {
            const ingredient_cost = this.productJokerSelected.revenue_cost / this.productJokerSelected.income
            const ingredientCostFormated = parseFloat(ingredient_cost.toFixed(2))
            const addProductJoker = { name: this.productJokerSelected.name, weight: this.productJokerSelected.income, unit1: 'UNIDADE', price: this.productJokerSelected.revenue_cost, unit2: 'UNIDADE', quantity: 1, ingredient_cost: ingredientCostFormated }
            this.all.push(addProductJoker)

            this.updateAllNumbers()
        },
        calculateCostOfAnIngredient(index: number): void {
            const resultvalidate = this.validateIfThereIsANumber0(index)

            if (resultvalidate) {
                this.all[index].ingredient_cost = 0
                this.updateAllNumbers()
            } else {
                const updateingredientCost = this.all[index].quantity * this.all[index].price / this.all[index].weight

                this.all[index].ingredient_cost = parseFloat(updateingredientCost.toFixed(2))

                this.updateAllNumbers()
            }
        },
        validateIfThereIsANumber0(index: number) {
            const validate = Object.entries(this.all[index]).some(([key, value]) => typeof value === 'number' && value === 0 && key != "ingredient_cost");

            return validate
        },
        prepareData() {
            const dataAssembly = {
                productInformation: {
                    name: this.nameProduct,
                    income: this.income,
                    recipe_time: this.recipeTime,
                    profit_percentage: this.profitPecentage,
                    revenue_cost: this.costOfRevenue,
                    fixed_cost: this.fixedCost,
                    labor: this.labor,
                    profit: this.profit,
                    final_recipe_price: this.priceFinalRevenue,
                    price_per_unit: this.pricePerUnit,
                    operacional_cost: this.operationalCost,
                    id_category: this.id_category,
                    is_joker: this.isJoker
                },
                productIngredients: this.all
            }
            return dataAssembly
        },
        sendDataToTheBackend(): void {
            const dataFormated = this.prepareData()

            if (this.id_product) {
                this.sendUpdateData(dataFormated, this.id_product)
            } else {
                this.sendNewData(dataFormated)
            }

        },
        sendNewData(data: object): void {
            axios.post(urlApiBackEnd + '/product', data).then(() => {
                this.returnToHomePage()
            }).catch(() => {
            })
        },
        sendUpdateData(data: object, id_product: string): void {
            axios.put(urlApiBackEnd + '/product', {
                data,
                params: {
                    id: id_product
                }
            }).then(() => {
                this.returnToHomePage()
            }).catch(() => {

            })
        },
        getQueryIdProduct(): void {
            this.id_product = this.$route.query.idP as string
        },
        getQueryIdCategory(): void {
            this.id_category = this.$route.query.idC as string
        },
        getProduct() {
            axios.get(urlApiBackEnd + '/product/specific', {
                params: {
                    id: this.id_product
                }
            }).then((response) => {
                this.nameProduct = response.data.name
                this.income = response.data.income
                this.recipeTime = response.data.recipe_time
                this.operationalCost = response.data.operacional_cost
                this.profitPecentage = response.data.profit_percentage
                this.costOfRevenue = response.data.revenue_cost
                this.fixedCost = response.data.fixed_cost
                this.labor = response.data.labor
                this.profit = response.data.profit
                this.priceFinalRevenue = response.data.final_recipe_price
                this.pricePerUnit = response.data.price_per_unit
                this.isJoker = response.data.is_joker

            }).catch(() => {
            })

        },
        getProductIngredient(): void {
            axios.get(urlApiBackEnd + '/product/ingredient', {
                params: {
                    id: this.id_product
                }
            }).then((response) => {
                this.all = response.data
                this.updateAllNumbers()
            }).catch(() => {
            })
        },
        getProducsJoker(): void {
            axios.get(urlApiBackEnd + '/product/joker', {
            }).then((response) => {
                this.productsJoker = response.data
            }).catch(() => {
            })
        },
        returnToHomePage(): void {
            this.$router.push({ name: 'home' })
        },
        deletedMaterialOfArray(index: number) {
            this.all.splice(index, 1)
            this.updateAllNumbers()
        }

    }
}
</script>
<template>
    <main>
        <div class="header">
            <div class="header-label">
                <div class="name-product">
                    <input type="text" v-model="nameProduct">
                </div>
                <div class="joker">
                    <p>Produto coringa? </p>
                    <div class="select-joker">
                        <p>Sim</p>
                        <input type="radio" v-model="isJoker" :value="1">
                    </div>
                    <div class="select-joker">
                        <p>Não</p>
                        <input type="radio" v-model="isJoker" :value="0">
                    </div>
                </div>
            </div>
            <div class="specification">
                <div class="list">
                    <table>
                        <tr class="header-table">
                            <th></th>
                            <th>MATERIAL</th>
                            <th>PESO</th>
                            <th>UNIDADE</th>
                            <th>PREÇO EM R$</th>
                            <th>QUANTIDADE</th>
                            <th>UNIDADE</th>
                            <th>CUSTO DO INGREDIENTE</th>
                        </tr>
                        <tr class="line-table" v-for="(data, index) of all" :key="index">
                            <td><button @click="deletedMaterialOfArray(index)">Excluir</button></td>

                            <td><input type="text" placeholder="MATERIAL" v-model="data.name"></td>
                            <td><input type="number" placeholder="PESO" v-model="data.weight"
                                    @change="calculateCostOfAnIngredient(index)"></td>
                            <td><select name="SelectedUnit1" v-model="data.unit1">
                                    <option disabled selected>Selecione uma unidade </option>
                                    <option value="GRAMAS">GRAMAS</option>
                                    <option value="UNIDADE">UNIDADE</option>
                                    <option value="ML">ML</option>
                                </select></td>
                            <td>
                                <span>R$ </span>
                                <input type="NUMBER" placeholder="CUSTO" v-model="data.price"
                                    @change="calculateCostOfAnIngredient(index)">
                            </td>
                            <td><input type="NUMBER" placeholder="QUANTIDADE" v-model="data.quantity"
                                    @change="calculateCostOfAnIngredient(index)"></td>
                            <td><select name="SelectedUnit2" v-model="data.unit2">
                                    <option disabled selected>Selecione uma unidade</option>
                                    <option value="GRAMAS">GRAMAS</option>
                                    <option value="UNIDADE">UNIDADE</option>
                                    <option value="ML">ML</option>
                                </select></td>
                            <td>
                                <p>R$ {{ data.ingredient_cost }}</p>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="buttons">
                <div class="product-joker">
                    <p>Produtos coringa: </p>
                    <select name="productsJoker" id="productsJoker" v-model="productJokerSelected"
                        @change="addProductJoker">
                        <option disabled selected>Produtos Coringa</option>
                        <option :value="productJoker" v-for="(productJoker, index) in productsJoker" :key="index">{{
                            productJoker.name }}
                        </option>
                    </select>
                </div>
                <button @click="returnToHomePage">Voltar</button>
                <button @click="addNewIngredient">Adicionar novo ingrediente</button>
                <button @click="sendDataToTheBackend">Salvar</button>
            </div>
            <div class="labor-cost">
                <div class="preparation">
                    <div class="preparation-information">
                        <p>Rendimentos: </p>
                        <input type="number" v-model="income" @change="updateAllNumbers">
                    </div>
                    <div class="preparation-information">
                        <p>Tempo da receita (Em minutos): </p>
                        <input type="number" v-model="recipeTime" @change="updateAllNumbers">
                    </div>
                    <div class="preparation-information">
                        <p>Custo Operacional(GAS,LUZ, AGUA E ETC..): </p>
                        <input type="number" v-model="operationalCost" @change="updateAllNumbers">
                    </div>
                    <div class="preparation-information">
                        <p>Porcentagem(%) de lucro: </p>
                        <input type="number" v-model="profitPecentage" @change="updateAllNumbers">
                    </div>
                </div>
                <div class="cost">
                    <div class="cost-information">
                        <p>Custo da receita: </p>
                        <p>R$ {{ costOfIngredient }}</p>
                    </div>
                    <div class="cost-information">
                        <p>Custo fixo: </p>
                        <p>R$ {{ fixedCost }}</p>
                    </div>
                    <div class="cost-information">
                        <p>Mão de Obra: </p>
                        <p>R$ {{ labor }}</p>
                    </div>
                    <div class="cost-information">
                        <p>Lucro: </p>
                        <p>R$ {{ profit }}</p>
                    </div>
                    <div class="cost-information">
                        <p>Valor final da receita: </p>
                        <p>R$ {{ priceFinalRevenue }}</p>
                    </div>
                    <div class="cost-information">
                        <p>Valor da unidade: </p>
                        <p>R$ {{ pricePerUnit }}</p>
                    </div>
                </div>
                <div class="total">
                    <div class="total-information">
                        <p>Custo total da receita: </p>
                        <p>R$ {{ costOfRevenue }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
