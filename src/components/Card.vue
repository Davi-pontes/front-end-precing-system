<script setup lang="ts">
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
</script>
<template>
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium truncate">
                    Produtos cadastrados
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    <slot name="qtdProducts">0</slot>
                </div>
                <p class="text-xs text-muted-foreground">
                    Produtos cadastrados até o momento
                </p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Lucro médio
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    <slot name="averageProfit"></slot>
                    %
                </div>
                <p class="text-xs text-muted-foreground">
                    Média percentual de lucro sobre os custos.
                </p>
            </CardContent>
        </Card>
        <!-- <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle class="text-sm font-medium">
                    Active Now
                </CardTitle>
                <Activity class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div class="text-2xl font-bold">
                    +573
                </div>
                <p class="text-xs text-muted-foreground">
                    +201 since last hour
                </p>
            </CardContent>
        </Card> -->
    </div>
</template>