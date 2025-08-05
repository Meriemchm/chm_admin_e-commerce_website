"use client";

import { Modal } from "@/components/ui/modal";
import { useStoreModalStore } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import { Children, useEffect } from "react";

const SetupPage = () => {
  const onOpen = useStoreModalStore((state) => state.onOpen);
  const isOpen = useStoreModalStore((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  });
  return null;
};

export default SetupPage;
