<script lang="ts">
import type { IProduct } from '@/interface/Product';

export default {
    name: 'Cart',
    // props:{
    //   cart: Array as () => IProduct[] | null  
    // }
    data() {
        return {
            cart: [{
                name: 'Torta Holandesa',
                price: 15.00,
                description: `Camada de biscoito amanteigado
                        delidciosa creme de creme cheese e
                        chocolate branco nobre, brigadeiro meio amargo belga,
                        cobertura de ganache de chocolate meio amargo.`,
                image: '../../../public/images/1713014968661a88b801e0f_75_75.jpeg',
                quantity: 1
            },
            {
                name: 'Marangonoff',
                price: 15.00,
                description: `base de biscoito amanteigado,
                        uma camada de brigadeiro de ninho ,
                        muitos morangos frescos e chantininho finalizado com suspiro.`,
                image: '../../../public/images/172330848266b799c253f56_75_75.jpeg',
                quantity: 2
            },
            {
                name: 'Marangonoff',
                price: 15.00,
                description: `base de biscoito amanteigado,
                        uma camada de brigadeiro de ninho ,
                        muitos morangos frescos e chantininho finalizado com suspiro.`,
                image: '../../../public/images/172330848266b799c253f56_75_75.jpeg',
                quantity: 1
            },
            {
                name: 'Marangonoff',
                price: 15.00,
                description: `base de biscoito amanteigado,
                        uma camada de brigadeiro de ninho ,
                        muitos morangos frescos e chantininho finalizado com suspiro.`,
                image: '../../../public/images/172330848266b799c253f56_75_75.jpeg',
                quantity: 1
            }
            ] as IProduct[],
            subTotal: 0,
            freight: 4,
            total: 0
        }
    },
    created() {
        this.controllerCalculate()

    },
    methods: {
        controllerCalculate() {
            this.calculateSubTotal()
            this.calculateTotal()
        },
        calculateSubTotal() {
            if (this.cart) {
                const sum = this.cart.reduce((previous, current) => previous + (current.price * current.quantity), 0);
                this.subTotal = parseFloat(sum.toFixed(2))
            }
        },
        calculateTotal() {
            const sum = this.subTotal + this.freight
            this.total = parseFloat(sum.toFixed(2))
        },
        plusQuantityProduct(index: number) {
            this.cart[index].quantity++
            this.controllerCalculate()
        },
        subtractQuantityProduct(index: number) {
            if (this.cart[index].quantity === 1) {
                this.cart.splice(index, 1)
                this.controllerCalculate()
            } else {
                this.cart[index].quantity--
                this.controllerCalculate()
            }
        }
    }
}
</script>

<template>
    <main>
        <div class="flex flex-col items-center bg-[#8095c7] text-white h-[100vh]">
            <h1 class="text-center text-2xl">Jhenifer Doces</h1>
            <div class="flex w-[96%] items-center justify-between m-1" v-for="(product, index) in cart" :key="index">
                <img :src="product.image" alt="" class="w-12 h-12 rounded-md">
                <h5 class=" text-xl">{{ product.name }}</h5>
                <div class="flex justify-around w-16 bg-white text-black rounded-md">
                    <button class="cursor-pointer" @click="subtractQuantityProduct(index)">-</button>
                    <span>{{ product.quantity }}</span>
                    <button class="cursor-pointer" @click="plusQuantityProduct(index)">+</button>
                </div>
            </div>
            <div class="flex items-center m-1 w-[96%] h-[1px] bg-gray-600"></div>
            <div class="flex w-[96%] items-center justify-between m-1">
                <p>Subtotal</p>
                <p>R$ {{ subTotal }}</p>
            </div>
            <div class="flex items-center m-1 w-[96%] h-[1px] bg-gray-600"></div>
            <div class="flex w-[96%] items-center justify-between m-1">
                <p>Frete</p>
                <p>R$ {{ freight }}</p>
            </div>
            <div class="flex items-center m-1 w-[96%] h-[1px] bg-gray-600"></div>
            <div class="flex w-[96%] items-center justify-between m-1">
                <p>Total</p>
                <p>R$ {{ total }}</p>
            </div>
            <button class="border rounded-md p-1 w-[50%]">Finalizar compra</button>
        </div>
    </main>
</template>