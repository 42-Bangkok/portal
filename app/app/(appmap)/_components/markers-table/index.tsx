'use client'

import { DataTable } from "@/components/ui/data-table/data-table"
import { columns } from "./columns"
import { TMarkersTable } from "./types"


export const MarkersTable = (props: TMarkersTable) => {
  return (
    <DataTable columns={columns} data={props.data} />
  )
}
