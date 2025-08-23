"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type productColumn = {
  id: string;
  name: string;
  isArchived: boolean;
  isFeatured: boolean;
  price: string;
  category: string | null;
  size: string | null;
  color: string | null;
  createdAt: string;
};

export const columns: ColumnDef<productColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full"
          style={row.original.color ? { backgroundColor: row.original.color } : undefined}
        />
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <CellAction data={row.original} onEdit={() => {}} onDelete={() => {}} />
    ),
  },
];
