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
            this.$router.push({ name: 'homePrecification' })
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
            <ul class="nav-list">
                <li><button @click="backHome">Início</button></li>
                <li><button @click="addNewCategory" v-if="showButtonAddCategory">Adicionar Categoria</button></li>
                <li><button @click="goAllIngredients">Todos ingredientes</button></li>
                <li><button @click="goStock">Estoque</button></li>
            </ul>
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
    background: rgb(128, 149, 199);
    margin-bottom: 1em;
    color: white;
}

.head button {
    border: none;
    font-size: 14px;
    transition: 0.5s;
    background-color: transparent;
    color: white;
}

.head p {
    font-size: 2em;
    cursor: pointer;
}

.head button:hover {
    color: black;
}

.nav-list {
    list-style: none;
    display: flex;
}

.nav-list li {
    letter-spacing: 3px;
    margin-left: 3em;
}
</style>