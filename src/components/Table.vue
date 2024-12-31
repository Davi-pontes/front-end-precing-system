<script setup lang="ts">
import {
    FlexRender,
    getCoreRowModel,
    useVueTable
} from "@tanstack/vue-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { ColumnDef } from '@tanstack/vue-table'
import type { IIngredient } from '@/interface/Ingredient'
import type { DataTableProps } from "@/interface/DataTable"
import { ref, type PropType } from "vue"

const props = defineProps({
    ingredients: {
        type: Array as PropType<IIngredient[]>,
        default: () => []
    }
})

const tableHeader = ref<any>(null)
const tableBody = ref<any>(null)

const columns: ColumnDef<IIngredient>[] = [
    {

        accessorKey: "name",
        header: "Nome"
    },
    {
        accessorKey: "unit1",
        header: "Unidade"
    },
    {
        accessorKey: "weight",
        header: "Peso"
    },
    {
        accessorKey: "price",
        header: () => {
            return 'Preço'
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return formatted
        }


    }
]

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const dataTable = useVueTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return dataTable
}

const test = DataTable({ columns: columns, data: props.ingredients })

tableHeader.value = test.getHeaderGroups()[0].headers

tableBody.value = test.getRowModel().rows


</script>

<template>
    <div class="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead v-for="header in tableHeader" :key="header.id">
                        <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow v-for="row in tableBody" :key="row.id">
                    <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                        <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
</template>