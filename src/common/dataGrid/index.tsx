/** @format */

import {
  MaterialReactTable,
  MRT_ColumnDef,
  MRT_RowData
} from 'material-react-table'
import React from 'react'

interface DataGridProps<TData extends MRT_RowData> {
  col: MRT_ColumnDef<TData>[]
  row: TData[]
}

export default function DataGrid<TData extends MRT_RowData>({
  col,
  row
}: DataGridProps<TData>) {
  return (
    <MaterialReactTable
      columns={col}
      data={row}
      enableBottomToolbar={false}
      enableTopToolbar={false}
      enableColumnActions={false}
      muiTableHeadCellProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 0.5)',
          bgcolor: '#b0b0b0'
        }
      }}
      muiTableBodyCellProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 0.5)',
          paddingBottom: '0px !important',
          paddingTop: '0px !important',
          bgcolor: '#d0d0d0'
        }
      }}
      muiTableContainerProps={{
        sx: {
          border: '1px solid rgba(81, 81, 81, 0.5)',
          bgcolor: '#b0b0b0'
        }
      }}
    />
  )
}
