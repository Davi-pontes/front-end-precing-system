import type { CellContext, ColumnDef } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import Button from './ui/button/Button.vue'
import type { IColumnsTableUser } from '@/interface/User'
import Switch from './ui/switch/Switch.vue'

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  onUpdate?: (data: any) => void
}

export const columnsUser: ColumnDef<IColumnsTableUser>[] = [
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
    accessorKey: 'phone_number',
    header: 'Numero telefone'
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'is_admin',
    header: 'Admin'
  },
  {
    accessorKey: 'first_access',
    header: 'Primeiro acesso'
  },
  {
    accessorKey: 'last_access',
    header: 'Ultimo acesso'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: (context: CustomCellContext<IColumnsTableUser>) => {
      const {row, onUpdate} = context
      const datas = row.original
      return h(Switch,{
        modelValue: datas.active,
        "onUpdate:modelValue": () => {
          if(onUpdate){
            onUpdate(datas)
          }
        },
      })

    },
    header: 'Ativo'
  },
  {
    accessorKey: 'product_count',
    header: 'Produtos'
  }
]
