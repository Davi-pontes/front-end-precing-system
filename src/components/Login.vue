<script lang="ts">
import axios from "axios";

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

export default {
    name: 'Login',
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        async login() {
            try {
                const { data } = await axios.post(urlApiBackEnd + '/login', {
                    email: this.email,
                    password: this.password
                }, {
                    withCredentials: true
                })
                await localStorage.setItem("User", JSON.stringify(data))

                this.$router.push({ name: 'homePrecification' })
            } catch (error) {
                if (error.response && error.response.status) {
                    alert('Login ou/e senha incorreto.')
                } else {
                    alert('Não foi possível fazer o login, por favor entre em contato com o suporte.')
                }

            }
        },
    }
}
</script>

<template>
    <main>
        <div class="image">
            <img src="../assets/logo-relqui.png" alt="logo-up">
        </div>
        <div class="form">
            <div class="content">
                <h1>LOGIN</h1>
                <input type="email" placeholder="E-mail" v-model="email">
                <input type="password" placeholder="Senha" v-model="password">
                <button @click="login">Login</button>
                <span>Ao se conectar, você concorda com os
                    Termos, Condições e Políticas de Privacidade da Relqui.
                </span>
                <span>Não tem uma conta? Registre-se agora!</span>
            </div>

        </div>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100vh;
    background: rgb(128, 149, 199);
    flex-wrap: wrap;
}

.image img {
    width: 30em;
    height: 30em;
}

.form {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 30em;
    height: 70%;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
    height: 90%;
}

.content h1 {
    font-size: 25px;
}

.content input {
    width: 95%;
    height: 2.5em;
    border: 2px solid black;
    color: black;
    font-size: 16px;
    padding-left: 1em;
}

.content button {
    width: 100%;
    height: 2.5em;
    border: none;
    background: rgb(128, 149, 199);
    color: white;
    font-size: 1.1em;
    transition: 0.6s;
    cursor: pointer;
}

.content button:hover {
    background: rgb(104, 125, 175);
}

.content span {
    font-size: 13px;
    text-align: center;
}
</style>