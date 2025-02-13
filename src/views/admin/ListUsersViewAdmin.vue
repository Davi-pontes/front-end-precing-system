<script setup lang="ts">
import axios from 'axios'
import TableComponent from '@/components/Table.vue'
import { ref } from 'vue'
import { columnsUser } from '@/components/ColumnsUsers'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND

interface IUser {
  id: string
  name: string
  phone_number: string
  email: string
  is_admin: boolean
}

const allUsers = ref<IUser[]>([])
// const user = ref({
//   name: null, phone_number: null, email: null, password: null
// })

async function getAllUsers() {
  const { data } = await axios.get(urlApiBackEnd + '/user', { withCredentials: true })
  allUsers.value = data
}
// async function registrationUser() {
//   const { data } = await axios.post(urlApiBackEnd + '/user', user.value, {
//     withCredentials: true
//   })
//   allUsers.value.push(data.body)
// }
getAllUsers()
</script>

<template>
  <div class="border shadow-lg rounded-md p-4 mt-7">
    <TableComponent :columns="columnsUser" :data-props="allUsers"
      :informations-input-search="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }">
    </TableComponent>
  </div>
</template>
