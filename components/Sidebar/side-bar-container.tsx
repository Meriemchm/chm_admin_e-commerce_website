"use client";

import { UserButton } from "@clerk/nextjs";
import { ItemsNav } from "./items-nav";
import { ModeToggle } from "../mode-toggle";
import Image from "next/image";
import { useSidebarStore } from "@/hooks/use-side-bar";
import {useStores} from "@/hooks/use-stores";
import { cn } from "@/lib/utils";

export const SideBarContainer = () => {
  const { stores, loading } = useStores();
  console.log(stores)
  const { collapsed, toggle } = useSidebarStore();

  if (loading) return <div className="opacity-50"></div>;

  return (
    <div
      className={`flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } h-screen border-r`}
    >
      <div className="p-4 flex flex-col flex-1">
        {/* Toggle button */}
        <div className="flex justify-between items-center mb-6">
          {!collapsed && (
            <h2 className="uppercase text-2xl">{stores[0]?.name}</h2>
          )}
          <button className="p-1" onClick={toggle}>
            <Image src="/toggle.svg" alt="toggle-icon" width={24} height={24} />
          </button>
        </div>

        {/* Navigation items */}
        <ItemsNav />
      </div>

      {/* Bottom part */}
      <div
        className={cn(
          " border-t  ",
          collapsed
            ? "p-5 flex-col-reverse justify-center items-center gap-4 "
            : "p-4 flex justify-between"
        )}
      >
        <div
          className={cn(collapsed && "flex items-center justify-center pb-2")}
        >
          <UserButton />
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};
