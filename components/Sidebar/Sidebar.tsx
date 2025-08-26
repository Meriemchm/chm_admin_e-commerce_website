import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

import { Menu } from "lucide-react";
import StoreSwitcher from "./store-switcher";
import { ItemsNav } from "@/components/Sidebar/items-nav";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // shadcn
import { SideBarContainer } from "./side-bar-container";

const Sidebar = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white shadow-md flex-col justify-between dark:text-white dark:bg-neutral-900">
        {/* Partie haute */}
        <SideBarContainer stores={stores} />
      </div>

      {/* Mobile sidebar */}
      <div className="md:hidden p-2">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 border rounded-md shadow-sm">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col p-4 w-64"
          >
            {/* Header du drawer (optionnel) */}
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>

            {/* Partie haute */}
            <SideBarContainer stores={stores} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
