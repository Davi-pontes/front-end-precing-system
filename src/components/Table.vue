<script setup lang="ts" generic="TData,TValue">
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
import { ref, watch } from 'vue';
import type { IUpdatedIngredient, IUpdateIngredient } from '@/interface/Ingredient'
import FormIngredient from './FormIngredient.vue'

const props = defineProps<{
    columns: ColumnDef<TData>[]
    informationsInputSearch: { placeHolder: string, searchProperty: string }
    dataProps: TValue[]
}>()

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const selectedIngredient = ref<IUpdateIngredient>()
let showFormIngredient = ref(false)
const data = ref<typeof props.dataProps>([])

watch(() => props.dataProps, (newData) => {
    data.value = newData
}, { immediate: true })

const table = useVueTable({
    get data() { return data.value as any },
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

function handleUpdate(updatedData: any) {
    selectedIngredient.value = updatedData
    showFormIngredient.value = true

}
function closeFormIngredient() {
    showFormIngredient.value = false
}

function updateSpecificIngredient(updatedDatas: IUpdatedIngredient) {
    const { updatedIngredient } = updatedDatas

    const indexIngredient = data.value.findIndex((ingredient : any) => ingredient.id === updatedIngredient.id)

    if (updatedIngredient.price && indexIngredient !== -1) {
        data.value = data.value.map((ingredient, i) =>
            i === indexIngredient ? { ...ingredient, price: updatedIngredient.price } : ingredient
        );
    }
    closeFormIngredient()
}
</script>

<template>
    <div>
        <div class="flex items-center py-4">
            <Input class="max-w-sm" :placeholder="informationsInputSearch.placeHolder"
                :model-value="table.getColumn(informationsInputSearch.searchProperty)?.getFilterValue() as string"
                @update:model-value=" table.getColumn(informationsInputSearch.searchProperty)?.setFilterValue($event)" />
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="outline" class="ml-auto bg-[#8095c7] text-white">
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
        <FormIngredient v-if="showFormIngredient && selectedIngredient" :selectdIngredient="selectedIngredient"
            @close="closeFormIngredient()" @completed="updateSpecificIngredient">
        </FormIngredient>
        <div class="border rounded-md">
            <Table :columns="columns" :informationsInputSearch="informationsInputSearch" :dataProps="dataProps">
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
                                <FlexRender :render="cell.column.columnDef.cell"
                                    :props="{ ...cell.getContext(), onUpdate: handleUpdate }" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colspan="columns.length" class="h-24 text-center">
                                Nenhum resultado.
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
            <Button class="bg-[#8095c7] text-white" variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
                Anterior
            </Button>
            <Button class="bg-[#8095c7] text-white" variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                Próximo
            </Button>
        </div>
    </div>
</template>