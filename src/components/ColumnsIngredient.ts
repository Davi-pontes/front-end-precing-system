import type { IColumnsTableIngredient } from '@/interface/Ingredient'
import type { CellContext, ColumnDef } from '@tanstack/vue-table'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'
import Button from './ui/button/Button.vue'
import Dropdown from './Dropdown.vue'

interface CustomCellContext<TData> extends CellContext<TData, unknown> {
  onUpdate?: (data: any) => void;
}

export const columnsIngredient: ColumnDef<IColumnsTableIngredient>[] = [
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
    accessorKey: 'unit1',
    header: 'Unidade'
  },
  {
    accessorKey: 'weight',
    header: 'Peso'
  },
  {
    accessorKey: 'price',
    header: () => {
      return 'Preço'
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'))
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
    cell: (context: CustomCellContext<IColumnsTableIngredient>) => {
      const { row, onUpdate } = context;
      const datas = row.original;

      return h(
        'div',
        { class: 'relative' },
        h(Dropdown, {
          label: 'Ingrediente',
          datas,
          onUpdate: (data: any) => {
            if (onUpdate) {
              onUpdate(data);
            }
          },
        })
      );
    },
  }
]
