<!-- <script lang="ts">
import type { IBusiness } from '@/interface/Business';
import type { IProduct } from '@/interface/Product'; 
export default {
    name: 'HomePageMenu',
    data() {
        return {
            businessInformations: {name: 'Jhenider Doces',
            opening: '13:00',
            closing: '18:30',
            state: 'Aberto',
            information: 'Entrega gratis acima de R$100,00'} as IBusiness,
            cartCount: 0,
            products: [{
                name: 'Torta Holandesa',
                price: 15.00,
                description: `Camada de biscoito amanteigado
                        delidciosa creme de creme cheese e
                        chocolate branco nobre, brigadeiro meio amargo belga,
                        cobertura de ganache de chocolate meio amargo.`,
                image: '../../../public/images/1713014968661a88b801e0f_75_75.jpeg'
            },
            {
                name: 'Marangonoff',
                price: 15.00,
                description: `base de biscoito amanteigado,
                        uma camada de brigadeiro de ninho ,
                        muitos morangos frescos e chantininho finalizado com suspiro.`,
                image: '../../../public/images/172330848266b799c253f56_75_75.jpeg'
            }] as IProduct[]
        }
    },
    methods: {
        addToCart(product: IProduct) {
            this.cartCount++
            console.log(product);
        }
    }
}
</script>

<template>
    <main>
        <div class="flex flex-col items-center h-full w-full bg-[#8095c7]">
            <div class="flex w-full bg-[#8095c7] items-center justify-around space-x-4 p-4">
                <h1 class="text-2xl text-white w-1/2 break-words ">{{ businessInformations.name }}</h1>
                <img src="../../assets/LogoJheniferdoces.png" alt="Logo da empresa" class="w-20 h-20 rounded-full">
            </div>
            <div class="flex w-full items-center justify-around text-white pb-4">
                <div class="flex items-center space-x-2">
                    <i class="fa-regular fa-clock"></i>
                    <p>{{ businessInformations.opening }} - {{ businessInformations.closing }}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <i class="fa-regular fa-building"></i>
                    <p>{{ businessInformations.state }}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2 w-full justify-center text-white pb-4">
                <i class="fa-solid fa-info"></i>
                <p>{{ businessInformations.information }}</p>
            </div>
            <div class="flex bg-white w-[97%] h-9 rounded-3xl px-4 items-center space-x-2">
                <input type="text" placeholder="Pesquise aqui!"
                    class="flex-grow bg-transparent outline-none text-black placeholder-gray-400 text-base">
                <a href=""
                    class="flex justify-center items-center text-white bg-[#8095c7] w-7 h-7 rounded-full hover:bg-blue-700 transition duration-300">
                    <i class="fas fa-search"></i>
                </a>
            </div>
            <div class="flex w-[97%] h-32 bg-white my-3 p-1 rounded-md shadow-lg cursor-pointer"
                v-for="(product, index) in products" :key="index" @click="addToCart(product)">
                <div class="flex flex-col w-[80%] h-full">
                    <h5 class=" text-xl">{{ product.name }}</h5>
                    <h5 class="">R$ {{ product.price }}</h5>

                    <h5 class="line-clamp text-gray-400">{{ product.description }}</h5>
                </div>
                <img :src="product.image" alt="" class="w-24 h-24 rounded-md">
            </div>
            <div class="absolute top-60 right-5 inline-block" v-if="cartCount > 0">
                <!-- Ícone do carrinho -->
<!-- <i class="fas fa-shopping-cart text-3xl "></i> -->
<!-- Contador de produtos no carrinho -->
<!-- <span class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 
                     bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {{ cartCount }}
                </span>
            </div>
        </div>
    </main> -->
<!-- </template> -->

<!-- <style>
.line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>  -->
