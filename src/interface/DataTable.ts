import type { ColumnDef } from '@tanstack/vue-table'

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[] | []
}
