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
  color: string[] | null;
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
        {Array.isArray(row.original.color) &&
          row.original.color.map((color: string, index: number) => (
            <div
              key={index}
              className="h-6 w-6 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
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
