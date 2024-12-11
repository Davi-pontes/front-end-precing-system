<script lang="ts">
import axios from 'axios';
const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

export default {
    name: "Product",
    props: {
        idCategory: String
    },
    data() {
        return {
            textInitialInputFile: 'Selecione uma imagem',
            showInputFile: false,
            showImageProduct: false,
            datasProduct: {
                nameProduct: '',
                priceProduct: 0,
                descriptionProduct: '',
                qtdInBox: 1,
                tax: 0,
                freigth: 0,
                fixedCost: 0
            },
            imageProduct: '',
            fileOriginalImage: null as File | null
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
        async sendDatasForDataBase() {
            let formData

            if (this.imageProduct) {

                formData = new FormData()

                if (this.fileOriginalImage) {
                    formData.append('nameProduct', this.datasProduct.nameProduct);
                    formData.append('priceProduct', this.datasProduct.priceProduct.toString());
                    formData.append('descriptionProduct', this.datasProduct.descriptionProduct);
                    formData.append('image', this.fileOriginalImage, this.fileOriginalImage.name);
                    formData.append('idCategory', this.idCategory as string);
                }
            } else {
                formData = {
                    nameProduct: this.datasProduct.nameProduct,
                    priceProduct: this.datasProduct.priceProduct,
                    descriptionProduct: this.datasProduct.descriptionProduct,
                    idCategory: this.idCategory
                }
            }
            await axios.post(urlApiBackEnd + '/product/only', formData).then(() => {
                this.$router.push({ name: 'homePrecification' })
            })
        },
        closeScreen() {
            this.$emit('closeScreenAddOnlyProduct')
        }
    }
}
</script>

<template>
    <main class="absolute bg-gray-400/50 w-full h-screen flex flex-col items-center justify-center">
        <div class="bg-white w-[55vw] h-[50dvh] rounded-md">
            <!-- Cabeçalho -->
            <div class="flex justify-between text-2xl w-[98%] h-15 mx-auto mt-2">
                <span>Adicionar produto</span>
                <button class="w-8 h-8 bg-[rgb(128,149,199)] rounded-lg" @click="closeScreen">
                    <i class="fa-solid fa-xmark text-white"></i>
                </button>
            </div>

            <!-- Conteúdo principal -->
            <div class="flex flex-col w-[98%] h-[75%] mx-auto mt-2">
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
                                <label for="price">Preço de compra</label>
                                <input type="number" placeholder="1" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.priceProduct">
                                <label for="price">Quantidade em caixa</label>
                                <input type="number" placeholder="1" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.qtdInBox">
                                <label for="price">Frete</label>
                                <input type="number" placeholder="0" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.freigth">
                            </div>
                            <!-- Segundo bloco interno -->
                            <div class="flex flex-col w-1/2">
                                <label for="stock">Imposto</label>
                                <input type="number" placeholder="0" id="stock" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.tax">
                                <label for="stock">Custo operacional</label>
                                <input type="number" placeholder="0" id="stock" class="border-2 outline-none mb-4 pl-2"
                                    v-model="datasProduct.fixedCost">
                            </div>
                        </div>
                        <div class="flex w-[95%] justify-between">
                            <span>Preço da unidade</span>
                            <span>R$ 00.00</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botão de salvar -->
            <div class="flex justify-end w-[98%]">
                <button class=" bg-[rgb(128,149,199)] text-white px-4 py-2 rounded"
                    @click="sendDatasForDataBase()">SALVAR PRODUTO</button>
            </div>
        </div>

    </main>
</template>