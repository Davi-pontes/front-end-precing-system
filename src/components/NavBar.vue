<script lang="ts">
import '../assets/navbar.css'
export default {
    name: 'NavBar',
    props: {
        showButtonAddCategory: Boolean
    },
    methods: {
        addNewCategory() {
            this.$emit('newCategory')
        },
        goAllIngredients() {
            this.$router.push({ name: 'allIngredients' })
        },
        backHome() {
            this.$router.push({ name: 'home' })
        }
    }
}
</script>

<template>
    <main>
        <div class="head">
            <p @click="backHome">Jhenifer Doces</p>
            <button @click="addNewCategory" v-if="showButtonAddCategory">Adicionar Categoria</button>
            <button @click="goAllIngredients">Todos ingredientes</button>
        </div>
    </main>
</template>