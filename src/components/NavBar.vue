<script lang="ts">
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
        },
        goStock() {
            this.$router.push({ name: 'stock' })
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
            <button @click="goStock">Estoque</button>
        </div>
    </main>
</template>

<style scoped>
.head {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 3em;
    background: linear-gradient(120deg, rgb(65, 81, 117), rgb(231, 231, 231));
    margin-bottom: 1em;
    color: white;
}

.head button {
    border: none;
    width: 20em;
    height: 2.5em;
    font-size: 14px;
    margin-right: 5em;
    transition: 0.5s;
    border-radius: 10px;
    background-color: transparent;
    border: 1px solid white;
    color: white;
}

.head p {
    font-size: 2em;
    cursor: pointer;
}

.head button:hover {
    background-color: white;
    border: 1px solid white;
    color: black;
}
</style>