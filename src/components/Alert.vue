<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { PartyPopper } from 'lucide-vue-next';

function goToYoutube(){
  window.open("https://www.youtube.com/@HelquiTech")
}

</script>

<template>
  <Alert variant="destructive" class="cursor-pointer" @click="goToYoutube">
    <PartyPopper class="h-4 w-4" />
    <AlertTitle>Primeira vez aqui?</AlertTitle>
    <AlertDescription>
      Bem-vindo ao Helqui! Se esta é sua primeira vez por aqui, clique aqui para acessar nosso passo a passo e começar com o pé direito.
    </AlertDescription>
  </Alert>
</template>