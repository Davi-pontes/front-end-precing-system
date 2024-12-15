<script lang="ts">
import axios from 'axios';
const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
import MessageAlert from './MessageAlert.vue';
export default {
    name: "Product",
    components: {
        MessageAlert
    },
    props: {
        idCategory: String,
        idProduct: {
            type: String,
            required: false, 
            default: null,
        },
    },
    data() {
        return {
            textInitialInputFile: 'Selecione uma imagem',
            showMessageAlert: false,
            messageForAlert: '',
            showInputFile: false,
            showImageProduct: false,
            datasProduct: {
                nameProduct: '',
                priceProduct: 0,
                descriptionProduct: '',
                qtdInBox: 1,
                tax: 0,
                freigth: 0,
                fixedCost: 0,
                pricePerUnit: 0,
                profitPecentage: 0,
                costProduct: 0,
                profit: 0,
                idCategory: this.idCategory,
                only: true
            },
            imageProduct: '',
            fileOriginalImage: null as File | null
        }
    },
    async created(){
        if(this.idProduct){
           await axios.get(urlApiBackEnd + '/product/specific',{
            params: {id: this.idProduct}
           }).then((response) =>{
            const {data} = response
            console.log(data);
            this.datasProduct.nameProduct = data.name
            this.datasProduct.priceProduct = data.final_recipe_price
            this.datasProduct.descriptionProduct = data.description
            this.datasProduct.qtdInBox = data.qtd_box
            this.datasProduct.tax = data.tax
            this.datasProduct.freigth = data.freight
            this.datasProduct.fixedCost = data.fixed_cost
            this.datasProduct.pricePerUnit = data.price_per_unit
            this.datasProduct.profitPecentage = data.profit_percentage
            this.datasProduct.costProduct = data.revenue_cost
            this.datasProduct.profit = data.profit
           })
        }
    },
    methods: {
        async imageSelected(event: Event) {
            const inputTarget = event.target as HTMLInputElement;

            if (inputTarget.files && inputTarget.files[0]) {
                const file = inputTarget.files[0];

                this.textInitialInputFile = 'Imagem selecionada!';

                this.fileOriginalImage = file

                this.imageProduct = await this.formatedImage(file);

            } else {
                this.textInitialInputFile = 'Selecione uma imagem.';
            }
        },
        formatedImage(file: File): Promise<string> {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.addEventListener('load', (e) => {
                    const readerTarget = e.target as FileReader;
                    resolve(readerTarget.result as string);
                });

                reader.readAsDataURL(file);
            });
        },
        showAlertMessage(message: string) {
            this.messageForAlert = message
            this.showMessageAlert = true
        },
        removeAlert() {
            this.showMessageAlert = false
        },
        async sendDatasForDataBase() {
            await axios.post(urlApiBackEnd + '/product/only', this.datasProduct).then((response) => {
                this.$emit('addNewProduct', response.data)
            }).catch((error) => {
                if (error.response.data) this.showAlertMessage(error.response.data)
            })
        },
        // Old formated for send datas with image
        // async sendDatasForDataBase() {
        //     let formData

        //     if (this.imageProduct) {

        //         formData = new FormData()

        //         if (this.fileOriginalImage) {
        //             formData.append('nameProduct', this.datasProduct.nameProduct);
        //             formData.append('priceProduct', this.datasProduct.priceProduct.toString());
        //             formData.append('descriptionProduct', this.datasProduct.descriptionProduct);
        //             formData.append('image', this.fileOriginalImage, this.fileOriginalImage.name);
        //             formData.append('idCategory', this.idCategory as string);
        //         }
        //     } else {
        //         formData = {
        //             nameProduct: this.datasProduct.nameProduct,
        //             priceProduct: this.datasProduct.priceProduct,
        //             descriptionProduct: this.datasProduct.descriptionProduct,
        //             idCategory: this.idCategory
        //         }
        //     }
        //     await axios.post(urlApiBackEnd + '/product/only', formData).then(() => {
        //         this.$router.push({ name: 'homePrecification' })
        //     })
        //},
        updateAllNumbers() {
            this.calculateCost()
            this.calculateCostTotal()
            if (this.datasProduct.profit > 0) this.calculateProfit()
        },
        closeScreen() {
            this.clearDatas()
            this.$emit('closeScreenAddOnlyProduct')
        },
        calculateCostTotal() {
            this.datasProduct.pricePerUnit =
                (this.datasProduct.profit +
                    this.datasProduct.priceProduct +
                    this.datasProduct.tax +
                    this.datasProduct.fixedCost +
                    this.datasProduct.freigth) / this.datasProduct.qtdInBox
        },
        calculateCost() {
            this.datasProduct.costProduct = this.datasProduct.tax + this.datasProduct.fixedCost +
                this.datasProduct.freigth + this.datasProduct.priceProduct
        },
        calculateProfit(): void {
            this.datasProduct.profit = (this.datasProduct.costProduct * this.datasProduct.profitPecentage) / 100
            this.calculateCostTotal()
        },
        clearDatas(){
            this.datasProduct = {
                nameProduct: '',
                priceProduct: 0,
                descriptionProduct: '',
                qtdInBox: 1,
                tax: 0,
                freigth: 0,
                fixedCost: 0,
                pricePerUnit: 0,
                profitPecentage: 0,
                costProduct: 0,
                profit: 0,
                idCategory: '',
                only: true
            }
        }
    }
}
</script>

<template>
    <main class="absolute bg-gray-400/50 w-full h-screen flex flex-col items-center justify-center">
        <div class="bg-white w-[55vw] h-[53dvh] rounded-md">
            <MessageAlert :message="messageForAlert" @removeAlert="removeAlert" v-if="showMessageAlert" />
            <!-- Cabeçalho -->
            <div class="flex justify-between text-2xl w-[98%] h-15 mx-auto mt-2">
                <span>Adicionar produto</span>
                <button class="w-8 h-8 bg-[rgb(128,149,199)] rounded-lg" @click="closeScreen">
                    <i class="fa-solid fa-xmark text-white"></i>
                </button>
            </div>

            <!-- Conteúdo principal -->
            <div class="flex flex-col w-[98%] h-[45%] mx-auto mt-2">
                <div class="flex w-full h-full gap-4">
                    <!-- Primeira coluna -->
                    <div class="flex flex-col w-1/2">
                        <label for="name" class="mt-6">Nome do produto</label>
                        <input type="text" placeholder="Nome do produto" id="name" class="border-2 outline-none mb-4"
                            v-model="datasProduct.nameProduct">
                        <label for="description">Descrição</label>
                        <textarea name="description" id="description" class="w-full h-20 border-2"
                            v-model="datasProduct.descriptionProduct"></textarea>
                    </div>

                    <!-- Segunda coluna -->
                    <div class="flex flex-col w-1/2">
                        <span>Precificação</span>
                        <div class="flex w-[95%] h-[60%] gap-4">
                            <!-- Primeiro bloco interno -->
                            <div class="flex flex-col w-1/2">
                                <label for="price">Quantidade em caixa</label>
                                <input type="number" placeholder="1" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.qtdInBox" @change="updateAllNumbers">
                                <label for="stock">Imposto</label>
                                <input type="number" placeholder="0" id="stock" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.tax" @change="updateAllNumbers">
                                <label for="price">Frete</label>
                                <input type="number" placeholder="0" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.freigth" @change="updateAllNumbers">
                            </div>
                            <!-- Segundo bloco interno -->
                            <div class="flex flex-col w-1/2">
                                <label for="price">Preço de compra</label>
                                <input type="number" placeholder="1" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.priceProduct" @change="updateAllNumbers">
                                <label for="stock">Custo operacional</label>
                                <input type="number" placeholder="0" id="stock" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.fixedCost" @change="updateAllNumbers">
                                <label for="stock">Porcentagem de lucro</label>
                                <input type="number" placeholder="0" id="stock" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.profitPecentage" @change="calculateProfit">
                                
                               
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-around items-center w-[98%] h-[25%] mx-auto mt-4">
                <div class="calculationResults">
                    <span class="value">R$ {{ datasProduct.costProduct.toFixed(2) }}</span>
                    <span>Custo</span>
                </div>
                <div class="calculationResults">
                    <span class="value">R$ {{ datasProduct.profit.toFixed(2) }}</span>
                    <span>Lucro</span>
                </div>
                <div class="calculationResults">
                    <span class="value">R$ {{ datasProduct.pricePerUnit.toFixed(2) }}</span>
                    <span>Preço da unidade</span>
                </div>
            </div>
            <!-- Botão de salvar -->
            <div class="flex justify-end w-[98%] mx-auto mt-4">
                <button class=" bg-[rgb(128,149,199)] text-white px-4 py-2 rounded"
                    @click="sendDatasForDataBase()">SALVAR PRODUTO</button>
            </div>
        </div>

    </main>
</template>

<style scoped>
.calculationResults{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 5rem;
    background-color: #f6f6f6;
    border-radius: 10px;
}
.value{
    font-size: 25px;
}
/* .calculationResults span{
    font-weight: bold;
    font-size: 20px;
} */
</style>