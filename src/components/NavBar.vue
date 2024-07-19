<script lang="ts">
import '../assets/navbar.css'
export default {
    name: 'NavBar',

    methods: {
        addNewCategory() {
            this.$emit('newCategory')
        }
    }
}
</script>

<template>
    <main>
        <div class="head">
            <p>Jhenifer Doces</p>
            <button @click="addNewCategory">Adicionar Categoria</button>
        </div>
    </main>
</template>