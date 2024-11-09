<script lang="ts">
export default {
    name: "Product",

    data() {
        return {
            textInitialInputFile: 'Selecione uma imagem',
            showInputFile: false,
            showImageProduct: false,
            imageProduct: ''
        }
    },
    methods: {
        imageSelected(event: Event) {
            const inputTarget = event.target as HTMLInputElement;

            if (inputTarget.files && inputTarget.files[0]) {
                const file = inputTarget.files[0];

                this.textInitialInputFile = 'Imagem selecionada!';

                this.formatedImage(file);
            } else {
                this.textInitialInputFile = 'Selecione uma imagem.';
            }
        },
        formatedImage(file: File) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const readerTarget = e.target as FileReader;

                this.imageProduct = readerTarget.result as string;
            });

            reader.readAsDataURL(file);
            this.showImageProduct = true
        }
    }
}
</script>

<template>
    <main class="absolute bg-gray-400/50 w-full h-screen flex flex-col items-center justify-center">
        <div class=" bg-white w-[60vw] h-[70dvh] rounded-md">
            <div class="flex flex-col w-[98%] mx-auto">
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
                        <input type="text" id="name" class="border-2">
                        <label for="price">Preço do produto</label>
                        <input type="number" class="border-2">
                    </div>
                </div>
                <label for="description">Descrição</label>
                <textarea name="description" id="description" class="w-[100%] h-20 border-2"></textarea>
            </div>
        </div>
    </main>
</template>