<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

const email = ref<string | null>(null);
    const password = ref<string | null>(null);
    const route = useRoute();
    const router = useRouter();
    const routeName = ref(route.name);

    onMounted(() => {
      routeName.value = route.name;
    });

    async function login () {
      try {
        const { data } = await axios.post(
          `${urlApiBackEnd}/login`,
          { email: email.value, password: password.value },
          { withCredentials: true }
        );
        localStorage.setItem('User', JSON.stringify(data));

        if (routeName.value === 'loginAdmin') {
          router.push({ name: 'AdminUsers' });
        } else {
          router.push({ name: 'Inicio' });
        }
      } catch (error: any) {
        if (error.response?.status) {
          alert('Login ou/e senha incorreto.');
        } else {
          alert('Não foi possível fazer o login, por favor entre em contato com o suporte.');
        }
      }
    };
</script>

<template>
  <main>
    <div class="image">
      <img src="../../assets/Logo-helqui-com-corde-fundo.png" alt="logo-up" />
    </div>
    <div class="form">
      <div class="content">
        <h1>LOGIN</h1>
        <input type="email" placeholder="E-mail" v-model="email" />
        <input type="password" placeholder="Senha" v-model="password" @keyup.enter="login" />
        <div>
          <button @click="login">Login</button>
        </div>
        <span>Ao se conectar, você concorda com os Termos, Condições e Políticas de Privacidade da
          Relqui.
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
  margin-bottom: 1em;
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

.btn-create-new-account {
  font-size: 16px;
  text-align: center;
}
</style>
