<script lang="ts">
import '../assets/AddCategory.css';
import axios from 'axios';

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
export default {
    name: "AddCategory",

    data() {
        return {
            nameCategory: null
        }
    },
    methods: {
        prepareData(): object {
            const dataForSend = { name: this.nameCategory }

            return dataForSend
        },
        async dataSend() {
            const dataFormated = this.prepareData()

            await axios.post(urlApiBackEnd + '/category', dataFormated).then((response) => {
                this.$emit('updateCategory', response.data)
            }).catch()
        }

    }
}
</script>

<template>
    <main class="container">
        <div class="form">
            <div class="form-label">
                <label>
                    Nova Categoria
                </label>
            </div>
            <div class="form-input">
                <label for="name-category">Nome da categoria</label>
                <input type="text" id="name-category" placeholder="Digite o nome da categoria." v-model="nameCategory">
            </div>
            <div class="form-button">
                <button @click="dataSend">
                    Salvar
                </button>
            </div>
        </div>

    </main>
</template>