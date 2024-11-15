<script lang="ts">
import axios from 'axios';
const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

export default {
    name: "Product",

    data() {
        return {
            textInitialInputFile: 'Selecione uma imagem',
            showInputFile: false,
            showImageProduct: false,
            imageProduct: '',
            nameProduct: '',
            priceProduct: '',
            descriptionProduct: '',
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
            const formData = new FormData()

            if (this.fileOriginalImage) {
                formData.append('nameProduct', this.nameProduct);
                formData.append('priceProduct', this.priceProduct);
                formData.append('descriptionProduct', this.descriptionProduct);
                formData.append('image', this.fileOriginalImage, this.fileOriginalImage.name);
            }

            await axios.post(urlApiBackEnd + '/product/only', formData)

        }
    }
}
</script>

<template>
    <main class="absolute bg-gray-400/50 w-full h-screen flex flex-col items-center justify-center">
        <div class=" bg-white w-[55vw] h-[50dvh] rounded-md">
            <div class="flex flex-col w-[98%] h-[85%] mx-auto mt-2">
                <div class="flex w-full gap-4">
                    <div class="flex flex-col w-[35%]">
                        <label for="image"
                            class="flex items-center justify-center text-white w-60 h-60 bg-gray-400 cursor-pointer">
                            <input type="file" accept="image/*" id="image" v-on:change="imageSelected"
                                v-show="showInputFile">
                            <span>
                                <span v-if="!imageProduct">{{ textInitialInputFile }}</span>

                                <img :src="imageProduct" alt="Imagem selecionada" v-if="imageProduct"
                                    class="max-w-[100%]">
                            </span>
                        </label>
                    </div>
                    <div class="flex flex-col w-[1000%]">
                        <label for="name">Nome do produto</label>
                        <input type="text" id="name" class="border-2 outline-none" v-model="nameProduct">
                        <label for="price">Preço do produto</label>
                        <input type="number" class="border-2 outline-none" v-model="priceProduct">
                    </div>
                </div>
                <label for="description">Descrição</label>
                <textarea name="description" id="description" class="w-[100%] h-20 border-2"
                    v-model="descriptionProduct"></textarea>
            </div>
            <div class="flex justify-around w-[98%] mx-auto">
                <button class="w-40 bg-[rgb(128,149,199)]  text-white px-4 py-2 rounded">Cancelar</button>
                <button class="w-40 bg-[rgb(128,149,199)] text-white px-4 py-2 rounded"
                    @click="sendDatasForDataBase()">Salvar</button>
            </div>
        </div>
    </main>
</template>