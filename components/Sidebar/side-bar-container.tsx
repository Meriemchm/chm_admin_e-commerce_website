import { UserButton } from "@clerk/nextjs";
import { ItemsNav } from "./items-nav";
import StoreSwitcher from "./store-switcher";
import { Store } from "@/lib/generated/prisma";
import { ModeToggle } from "../mode-toggle";

interface SideBarContainerProps {
  stores: Store[];
}

export const SideBarContainer: React.FC<SideBarContainerProps> = ({
  stores,
}) => {
  return (
    <>
      <div className="md:p-4">
        <StoreSwitcher items={stores} />
        <div className="mt-6">
          <ItemsNav className="flex flex-col space-y-4" />
        </div>
      </div>

      {/* Partie basse (user button) */}
      <div className="p-4 border-t">
        <div className="flex justify-between ">
          <UserButton />
          <ModeToggle />
        </div>
      </div>
    </>
  );
};
