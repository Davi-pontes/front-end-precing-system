<script lang="ts">
import axios from 'axios';

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
export default {
    name: "AddCategory",
    props: {
        nameUser: null,
        idUser: null
    },
    data() {
        return {
            nameCategory: null,
        }
    },
    created() {

    },
    methods: {
        prepareData(): object {
            const dataForSend = { name: this.nameCategory, user_id: this.idUser }

            return dataForSend
        },
        async dataSend() {
            const dataFormated = this.prepareData()

            await axios.post(urlApiBackEnd + '/category', dataFormated).then((response) => {
                this.$emit('updateCategory', response.data)
            }).catch()
        },
        cancel(): void {
            this.$emit('cancelAddNewCategory')
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
                <button @click="cancel">
                    Cancelar
                </button>
            </div>
        </div>

    </main>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(194, 194, 194, 0.582);
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgb(194, 194, 194);
    width: 30em;
    height: 30em;
    border-radius: 10px;
    box-shadow: 0 3px 5px rgb(194, 194, 194);
    overflow: hidden;
}

.form-input {
    display: flex;
    flex-direction: column;
    margin: 1em;
}

.form-input label {
    color: white;
    margin-bottom: 1em;
}

.form-input input {
    display: flex;
    width: 90%;
    border-radius: 8px;
    padding: 8px;
    border: 2px solid #dfdfdf;
}

.form-label {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100%;
    height: 3em;
    background: rgb(128, 149, 199);
}

.form-button {
    display: flex;
    justify-content: space-between;
    width: 90%;
    height: 2em;
    margin: 1em;
}

.form-button button {
    width: 15em;
    height: 100%;
    border: none;
    background-color: transparent;
    color: white;
    cursor: pointer;
    background: rgb(128, 149, 199);
    border-radius: 8px;
}
</style>