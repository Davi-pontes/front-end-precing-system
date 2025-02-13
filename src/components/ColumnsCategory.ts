import type { CellContext, ColumnDef } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import Button from './ui/button/Button.vue'
import Dropdown from './Dropdown.vue'
import type { IColumnsTableCategory } from '@/interface/Category'

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  onUpdate?: (data: any) => void
  onDelete?: (data: any) => void
  onDetail?: (data: any) => void
}

export const columnsCategory: ColumnDef<IColumnsTableCategory>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked: table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => ['Nome', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name'))
  },
  {
    accessorKey: "product_count",
    header: () => h("div", { class: "text-center w-full" }, "Produtos na Categoria"),
    cell: ({ row }) =>
      h("div", { class: "text-center w-full" }, row.getValue("product_count")),
    meta: {
      className: 'text-center'
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: (context: CustomCellContext<IColumnsTableCategory>) => {
      const { row, onUpdate, onDelete, onDetail } = context
      const datas = row.original

      return h(
        'div',
        { class: 'relative' },
        h(Dropdown, {
          label: 'Categoria',
          datas,
          onUpdate: (data: any) => {
            if (onUpdate) {
              onUpdate(data)
            }
          },
          onDelete: (data: any) => {
            if (onDelete) {
              onDelete(data)
            }
          },
          onDetail: (data: any) => {
            if (onDetail) {
              onDetail(data)
            }
          }
        })
      )
    }
  }
]
