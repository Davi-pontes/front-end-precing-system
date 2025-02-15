import type { CellContext, ColumnDef } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import Button from './ui/button/Button.vue'
import Dropdown from './Dropdown.vue'
import type { IColumnsTableProduct } from '@/interface/Product'

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  onUpdate?: (data: any) => void
  onDelete?: (data: any) => void
  onDetail?: (data: any) => void
}

export const columnsProduct: ColumnDef<IColumnsTableProduct>[] = [
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
    accessorKey: 'income',
    header: 'Rendimento'
  },
  {
    accessorKey: 'name_category',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => ['Categoria', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name_category'))
  },
  {
    accessorKey: 'revenue_cost',
    header: () => {
      return 'Custo do Produto'
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('revenue_cost'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return formatted
    }
  },
  {
    accessorKey: 'price_per_unit',
    header: () => {
      return 'Preço de venda'
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price_per_unit'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return formatted
    }
  },
  {
    accessorKey: 'profit',
    header: () => {
      return 'Lucro'
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('profit'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return formatted
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: (context: CustomCellContext<IColumnsTableProduct>) => {
      const { row, onUpdate, onDelete, onDetail } = context
      const datas = row.original

      return h(
        'div',
        { class: 'relative' },
        h(Dropdown, {
          label: 'Produto',
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
