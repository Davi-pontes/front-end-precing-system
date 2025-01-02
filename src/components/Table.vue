<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState, ColumnFiltersState, VisibilityState } from '@tanstack/vue-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useVueTable,
} from '@tanstack/vue-table'
import { ChevronDown } from 'lucide-vue-next'
import { Button } from './ui/button'
import { Input } from '@/components/ui/input'
import { valueUpdater } from '@/lib/utils'
import { ref } from 'vue';

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
    get data() { return props.data },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
    onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
    onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
    onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        get sorting() { return sorting.value },
        get columnFilters() { return columnFilters.value },
        get columnVisibility() { return columnVisibility.value },
        get rowSelection() { return rowSelection.value },
    },
})
</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" placeholder="Filtre por nome"
                :model-value="table.getColumn('name')?.getFilterValue() as string"
                @update:model-value=" table.getColumn('name')?.setFilterValue($event)" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Colunas
                        <ChevronDown class="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in table.getAllColumns().filter((column) => column.getCanHide())" :key="column.id"
                        class="capitalize" :checked="column.getIsVisible()" @update:checked="(value) => {
                            column.toggleVisibility(!!value)
                        }">
                        {{ column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div class="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                        <TableHead v-for="header in headerGroup.headers" :key="header.id">
                            <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                                :props="header.getContext()" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colspan="columns.length" class="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Table>
        </div>
        <div class="flex items-center justify-end py-4 space-x-2">
            <div class="flex-1 text-sm text-muted-foreground">
                {{ table.getFilteredSelectedRowModel().rows.length }} de
                {{ table.getFilteredRowModel().rows.length }} linha(s) selecionada.
            </div>
            <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
                Anterior
            </Button>
            <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                Próximo
            </Button>
        </div>
    </div>

</template>

<!-- <script setup lang="ts" >
import { ArrowUpDown } from "lucide-vue-next"
import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getPaginationRowModel,
    getSortedRowModel
} from "@tanstack/vue-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { SortingState, ColumnDef, Updater, VisibilityState } from '@tanstack/vue-table'
import type { IIngredient } from '@/interface/Ingredient'
import type { DataTableProps } from "@/interface/DataTable"
import { ref, type PropType } from "vue"
import { Button } from "@/components/ui/button"
import Dropdown from "@/components/Dropdown.vue"
import { h } from 'vue'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { valueUpdater } from "@/lib/utils"

const props = defineProps({
    ingredients: {
        type: Array as PropType<IIngredient[]>,
        default: () => []
    }
})

const tableHeader = ref<any>(null)
const tableBody = ref<any>(null)

const columnVisibility = ref<VisibilityState>({})

const columns: ColumnDef<IIngredient>[] = [
    {

        accessorKey: "name",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                },
                {
                    default: () => [
                        "Name",
                        h(ArrowUpDown, { class: "ml-2 h-4 w-4" }),
                    ],
                }
            );
        }
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
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original
            return h(Dropdown, { payment })
        }
    }
]

function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const sorting = ref<SortingState>([])

    const setSorting = (updaterOrValue: Updater<SortingState>) => {
        if (typeof updaterOrValue === "function") {
            sorting.value = updaterOrValue(sorting.value);
        } else {
            sorting.value = updaterOrValue;
        }
    };

    const dataTable = useVueTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
        state: {
            sorting: sorting.value,
            get columnVisibility() { return columnVisibility.value },
        },
    })
    return dataTable
}

const test = DataTable({ columns: columns, data: props.ingredients })

tableHeader.value = test.getHeaderGroups()[0].headers

tableBody.value = test.getRowModel().rows


</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto">
                        Columns
                        <ChevronDown class="w-4 h-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                        v-for="column in tableHeader.getAllColumns().filter((column: any) => column.getCanHide())" :key="column.id"
                        class="capitalize" :checked="column.getIsVisible()" @update:checked="(value) => {
                            column.toggleVisibility(!!value)
                        }">
                        {{ column.id }}
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
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
        <div class="flex items-center justify-end space-x-2 py-4">
            <Button variant="outline" size="sm" onClick="()=> table.previousPage()"
                disabled="!table.getCanPreviousPage()">
                Anterior
            </Button>
            <Button variant="outline" size="sm" onClick="()=> table.nextPage()" disabled="!table.getCanPreviousPage()">
                Próximo
            </Button>
        </div>
    </div>
</template> -->