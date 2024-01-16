"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TColumn = {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  createdBy: string;
};

export const columns: ColumnDef<TColumn>[] = [
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "description",
    header: "Description"
  },
  {
    accessorKey: "createdBy",
    header: "By"
  }
];
