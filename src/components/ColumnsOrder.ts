import type { ColumnDef } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import Button from './ui/button/Button.vue'
import type { IColumnsTableOrder } from '@/interface/Order'

export const columnsOrder: ColumnDef<IColumnsTableOrder>[] = [
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
    accessorKey: 'id',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
        },
        () => ['Número do Pedido', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })]
      )
    },
    cell: ({ row }) => h('div', row.getValue('id'))
  },
  {
    accessorKey: 'created_at',
    header: 'Dia'
  },
  {
    accessorKey: 'type_payment_method',
    header: 'Forma de pagamento'
  },
  {
    accessorKey: 'discount',
    header: 'Desconto',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('discount'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return formatted
    }
  },
  {
    accessorKey: 'tax',
    header: 'Taxa',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('tax'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return formatted
    }
  },
  {
    accessorKey: 'sub_total',
    header: 'Sub total',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('sub_total'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return formatted
    }
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)

      return formatted
    }
  }
]
