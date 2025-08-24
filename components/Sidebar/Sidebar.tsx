import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ItemsNav } from "@/components/Sidebar/items-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Sidebar = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: { userId },
  });

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white shadow-md flex flex-col justify-between">
      {/* Partie haute */}
      <div className="p-4">
        <StoreSwitcher items={stores} />
        <div className="mt-6">
          <ItemsNav className="flex flex-col space-y-4" />
        </div>
      </div>

      {/* Partie basse (user button) */}
      <div className="p-4 border-t">
        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
