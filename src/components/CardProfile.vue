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

function validateIfPaymentMethodsHasChanged(){
    console.log('Profile');
    
}
defineProps<{
    dataProfileUser: any
}>()
</script>

<template>
    <Card>
      <CardHeader>
        <CardTitle>Informações da conta</CardTitle>
        <CardDescription> Todas informções sobre sua conta na Helqui.</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="flex items-center">
          <Input :placeholder="dataProfileUser.name" class="w-2/3" />
          <Input :placeholder="dataProfileUser.phone_number" class="w-2/3" />
          <Input :placeholder="dataProfileUser.email" class="w-2/3" />
          <Input type="password" class="w-2/3"/>
        </form>
      </CardContent>
      <CardFooter class="border-t px-6 py-4 flex justify-end">
        <Button class="bg-muted" @click="validateIfPaymentMethodsHasChanged()">Salvar</Button>
      </CardFooter>
    </Card>
</template>