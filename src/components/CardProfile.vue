<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from './ui/button';
import { ref, watch } from 'vue';
const oldPassword = ref<string>()
const newPassword = ref<string>()
const dataTorender = ref<{
  id: string;
  name: string;
  email: string;
  phone_number: string;
  is_admin: number;
  password?: { oldPassword: string; newPassword: string }; // Adicionando a nova propriedade opcionalmente
}>({
  id: '',
  name: '',
  email: '',
  phone_number: '',
  is_admin: 1
});
function validateIfPaymentMethodsHasChanged() {
  emit('update', dataTorender.value)

}
function formatedData(data: any) {
  dataTorender.value = {
    id: data.id,
    name: data.name,
    email: data.email,
    phone_number: data.phone_number,
    is_admin: data.is_admin
  }
}
function updatePassword() {
  if (oldPassword.value && newPassword.value)
    dataTorender.value.password = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    }
}
const emit = defineEmits(['update'])

const props = defineProps<{
  dataProfileUser: any
}>()
watch(() => props.dataProfileUser, (newValue) => {
  if (newValue) {
    formatedData(newValue);
  }
}, { immediate: true });

</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Informações da conta</CardTitle>
      <CardDescription>Altere qualquer inforção aqui. Após salvar, você será desconectado.</CardDescription>
    </CardHeader>
    <CardContent>
      <form class="flex flex-col">
        <div class="p-6 pt-0">
          <Label for="nome">Nome</Label>
          <Input id="nome" placeholder="Nome" v-model="dataTorender.name" />
        </div>
        <div class="p-6 pt-0">
          <Label for="numero">Número de telefone</Label>
          <Input id="numero" placeholder="Número de telefone" v-model="dataTorender.phone_number" />
        </div>
        <div class="p-6 pt-0">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" v-model="dataTorender.email" />
        </div>
        <div class="p-6 pt-0">
          <Label for="current">Senha atual</Label>
          <Input id="current" type="password" v-model="oldPassword" />
        </div>
        <div class="p-6 pt-0">
          <Label for="current">Nova senha</Label>
          <Input id="current" type="password" v-model="newPassword" @change="updatePassword" />
        </div>
      </form>
    </CardContent>
    <CardFooter class="border-t px-6 py-4 flex justify-end">
      <Button class="bg-muted" @click="validateIfPaymentMethodsHasChanged()">Salvar</Button>
    </CardFooter>
  </Card>
</template>