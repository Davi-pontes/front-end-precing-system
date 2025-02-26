<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LoaderCircle } from 'lucide-vue-next';
import { useUserStore } from '@/stores/UserStore';
import type { RouteRecordName } from 'vue-router';
import { HttpLogin } from '@/http/login/login';
import MessageError from '@/components/MessageError.vue'
const urlApiBackEnd = import.meta.env.VITE_API_BACKEND;

const httpLogin = new HttpLogin(axios, urlApiBackEnd)
const credentials = ref<{
  email: string,
  password: string
}>({
  email: '',
  password: ''
})
const routeName = ref<RouteRecordName | null | undefined>(null);
const showSpinner = ref(false)

const showMessageErro = ref(false)
const messageForError = ref('')

const route = useRoute();
const router = useRouter();
const userStore = useUserStore()

const getRouteName = () => {
  routeName.value = route.name;
};

const login = async () => {
  try {
    showSpinner.value = true

    const authenticatedUser = await httpLogin.login(credentials.value)

    const dataUser = {
      id: authenticatedUser.id,
      name: authenticatedUser.name,
      email: authenticatedUser.email,
      firstAccess: authenticatedUser.firstAccess
    }
    userStore.setUser(dataUser)

    if (routeName.value && routeName.value === 'loginAdmin') {
      showSpinner.value = false
      router.push({ name: 'listUsersAdmin' });
    } else {
      showSpinner.value = false
      router.push({ name: 'Inicio' });
    }
  } catch (error: any) {
    showSpinner.value = false
    if (error.response && error.response.status) {
      alert('Login ou/e senha incorreto.');
    } else {
      alert('Não foi possível fazer o login, por favor entre em contato com o suporte.');
    }
  }
};

const createAccount = () => {
  router.push({ name: 'createAccount' });
};
// Função para mostrar alertas de error
function handleError(message: string) {
  messageForError.value = message
  showMessageErro.value = true
}
onMounted(() => {
  getRouteName();
});
</script>


<template>
  <main>
    <MessageError v-if="showMessageErro" :message="messageForError" @removeAlert="showMessageErro = false" />
    <div class="image">
      <img src="../assets/Logo-helqui-com-corde-fundo.png" alt="logo-up" />
    </div>
    <div class="form">
      <div class="content">
        <h1>LOGIN</h1>
        <input type="email" placeholder="E-mail" v-model="credentials.email" />
        <input type="password" placeholder="Senha" v-model="credentials.password" @keyup.enter="login" />
        <div>
          <button @click="login" :disabled="showSpinner">
            <LoaderCircle v-if="showSpinner" class="mr-3 size-5 animate-spin" />
            Login
          </button>

          <button @click="createAccount">Registre-se agora.</button>
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
  display: flex;
  align-items: center;
  justify-content: center;
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
