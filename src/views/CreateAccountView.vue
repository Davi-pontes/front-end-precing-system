<script lang="ts">
import axios, { AxiosError } from 'axios'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

export default {
  name: 'CreateAccount',
  components: {},
  data() {
    return {
      user: { name: null, phone_number: '', email: null, password: null },
      showMessage: true,
      message: ''
    }
  },
  methods: {
    formatPhoneNumber(numero: string): string {
    const numeroFormatado = numero.replace(/\D/g, '');
    return numeroFormatado;
},
    async registrationUser() {
      try {
        this.user.phone_number = this.formatPhoneNumber(this.user.phone_number)
        await axios.post(urlApiBackEnd + '/user/sign-up', this.user, {
          withCredentials: true
        })
        this.$router.push({ name: 'login' })
        
      } catch (error: unknown) {
        if(error instanceof AxiosError){
          console.log(error);
        }
      }
    }
  }
}
</script>

<template>
  <main>
    <div class="image">
      <img src="../assets/logo-relqui.png" alt="logo-up" />
    </div>
    <div class="form">
      <div class="content">
        <h1>Criar conta</h1>
        <input type="text" placeholder="Nome" v-model="user.name" />
        <MaskInput
          placeholder="Número de telefone"
          v-model="user.phone_number"
          mask="(##) 9 ####-####"
        />
        <input type="email" placeholder="E-mail" v-model="user.email" />
        <input type="password" placeholder="Senha" v-model="user.password" />
        <input type="password" placeholder="Confirmar senha" @keyup.enter="registrationUser" />
        <button @click="registrationUser">Salvar</button>
        <span
          >Ao clicar em salvar, você concorda com os Termos, Condições e Políticas de Privacidade
          da Helqui.
        </span>
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
  background: white;
  flex-wrap: wrap;
}

.image img {
  display: none;
}

@media (min-width: 728px) {
  .image img {
    display: block;
    width: 480px;
    height: 480px;
  }

  main {
    background: rgb(128, 149, 199);
  }
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
