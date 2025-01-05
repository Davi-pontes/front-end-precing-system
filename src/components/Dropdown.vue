<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const props = defineProps<{
    datas: any
    onUpdate?: (data: any) => void
}>()

function update() {
    if (props.onUpdate) {
        props.onUpdate(props.datas);
    }
}

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" class="h-8 w-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ingrediente</DropdownMenuLabel>
            <DropdownMenuItem @click="update()">
                Alterar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Deletar</DropdownMenuItem>
            <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>