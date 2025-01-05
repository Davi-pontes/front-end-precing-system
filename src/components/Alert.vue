<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { TriangleAlert } from 'lucide-vue-next';
defineProps<{
    title: string,
    description: string
}>()
</script>

<template>
  <Alert class="fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30dvw] h-[10dvh] bg-white" variant="destructive" :title="title" :description="description">
    <TriangleAlert/>
    <AlertTitle>{{title}}</AlertTitle>
    <AlertDescription>
      {{ description }}
    </AlertDescription>
  </Alert>
</template>