<script lang="ts">
import axios from 'axios'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

interface IUser {
  id: string
  name: string
  phone_number: string
  email: string
  is_admin: boolean
}
export default {
  name: 'ListUsers',
  data() {
    return {
      allUsers: [] as IUser[],
      user: { name: null, phone_number: null, email: null, password: null }
    }
  },
  created() {
    this.getAllUsers()
  },
  methods: {
    async getAllUsers() {
      const { data } = await axios.get(urlApiBackEnd + '/user', { withCredentials: true })
      this.allUsers = data
    },
    async registrationUser() {
      const { data } = await axios.post(urlApiBackEnd + '/user', this.user, {
        withCredentials: true
      })
      this.allUsers.push(data.body)
    }
  }
}
</script>

<template>
  <main>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in allUsers" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.phone_number }}</td>
            <td>{{ user.email }}</td>
            <td>Ativado</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <span>Adicionar novos usúarios.</span>
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="user.name" />
        <label for="phone_number">Telefone</label>
        <input type="text" id="phone_number" v-model="user.phone_number" />
        <label for="email">Email</label>
        <input type="email" id="email" v-model="user.email" />
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="user.password" />
        <button @click="registrationUser">Adicionar</button>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.table-container {
  width: 100%;
  height: 20em;
  overflow-y: auto;
}

table {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  border-collapse: collapse;
}

thead tr {
  background-color: rgb(128, 149, 199);
  color: white;
  font-weight: bold;
  text-align: center;
}

tbody tr {
  height: 2em;
  border-bottom: 1px solid #c8cacc;
}

tbody tr:hover {
  box-shadow: 1px 1px 5.5px #8b8b8b;
}

tbody tr:nth-of-type(even) {
  background-color: #e0e2e475;
}

tbody td {
  text-align: center;
}
</style>
