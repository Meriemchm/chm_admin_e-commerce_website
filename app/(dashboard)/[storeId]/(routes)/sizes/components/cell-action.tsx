"use client";

import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { sizeColumn } from "./columns";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: sizeColumn;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success("Size ID copied to clipboard.");
  };

  const handleEdit = () => {
    onEdit(data.id);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/sizes/${data.id}`
      );
      router.refresh();
      toast.success("billboard deleted");
    } catch (error) {
      toast.error("make sure you remove all .");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
        storeName={data.name}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleCopy}>
            <Copy className="mr-2 h-4 w-4" /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/sizes/${data.id}`)
            }
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={loading}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
