"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  storeName: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  storeName,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Delete store"
      description={
        <>
          Are you sure you want to delete the <strong>{storeName}</strong>{" "}
          store?
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
          className="hover:scale-105 duration-200"
        >
          Cancel
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
          className="hover:scale-105 duration-200"
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
