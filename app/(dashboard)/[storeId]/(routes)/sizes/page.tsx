import {format} from "date-fns";  
import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { sizeColumn } from "./components/columns";

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: { createdAt: "desc" },
  });

  const formatedSizes: sizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      {" "}
      <div className="flex-1 space-y-4 py-5">
        <SizeClient data={formatedSizes} />
      </div>{" "}
    </div>
  );
};

export default SizesPage;
