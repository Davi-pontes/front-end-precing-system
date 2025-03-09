<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TableComponent from '@/components/Table.vue'
import { columnsUser } from '@/components/ColumnsUsers'
import { HttpGetUser } from '@/http/user/get-users'
import type { IUser } from '@/interface/User'
import { HttpUpdateUser } from '@/http/user/update-user'

const urlApiBackEnd = import.meta.env.VITE_API_BACKEND
const httpGetUser = new HttpGetUser(axios, urlApiBackEnd)
const httpUpdateUser = new HttpUpdateUser(axios, urlApiBackEnd)
const router = useRouter();
const allUsers = ref<IUser[]>([])

async function getAllUsers() {
  try {
    const data = await httpGetUser.getUsers()
    allUsers.value = data
  } catch (error) {
    router.push({ name: 'loginAdmin' });
  }
}
async function handleUpdate(user: IUser) {
  try {
    if (user.active) {
      await httpUpdateUser.updateDisableUser(user.id)
      updateUserStatusLocally(false, user.id)
    } else {
      await httpUpdateUser.updateActivateUser(user.id)
      updateUserStatusLocally(true, user.id)
    }
  } catch (error) {
    console.error(error);
  }
}
function updateUserStatusLocally(status: boolean, idUser: string) {
  allUsers.value = allUsers.value.map((it) =>
    it.id === idUser
      ? { ...it, active: status }
      : it
  );
}
getAllUsers()
</script>

<template>
  <div class="border shadow-lg rounded-md p-4 mt-7">
    <TableComponent :columns="columnsUser" :data-props="allUsers"
      :informations-input-search="{ placeHolder: 'Filtre por nome.', searchProperty: 'name' }" @update="handleUpdate">
    </TableComponent>
  </div>
</template>
