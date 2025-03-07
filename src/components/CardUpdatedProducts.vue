<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { IProduct } from '@/interface/Product';

defineProps<{ products: IProduct[] }>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Produtos alterados</CardTitle>
    </CardHeader>
    <CardContent class="grid gap-8">
      <div v-for="product in products" :key="product.name" class="flex items-center gap-4">
        <Avatar class="hidden h-9 w-9 sm:flex">
          <AvatarFallback>
            <ShoppingCart :size="16" />
          </AvatarFallback>
        </Avatar>
        <div class="grid gap-1">
          <p class="text-sm font-medium leading-none">
            {{ product.name }}
          </p>
        </div>
        <div class="ml-auto font-medium">
          R$ {{ product.price_per_unit
            ?.toFixed(2) }}
        </div>
      </div>
    </CardContent>
  </Card>
</template>
