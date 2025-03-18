<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { IProduct } from '@/interface/Product';

defineProps<{ products: IProduct[] }>()
</script>

<template>
    <Card>
        <CardHeader>
            <CardTitle>
                Top 3 produtos.
            </CardTitle>
            <CardDescription>
                Top 3 produtos que mais lhe dá lucro.
            </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2" v-for="product in products" :key="product.name">
            <div class="space-y-1">
                <Span>{{ product.name }}</Span>
            </div>
            <div class="space-y-1">
                <Span>R$ {{ product.profit }}</Span>
            </div>
        </CardContent>
    </Card>
</template>