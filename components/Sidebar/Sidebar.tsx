import { redirect } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // shadcn
import { SideBarContainer } from "./side-bar-container";

const Sidebar = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen bg-white shadow-md flex-col justify-between dark:text-white dark:bg-neutral-900">
 
        <SideBarContainer />
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

            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>


            <SideBarContainer />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Sidebar;
