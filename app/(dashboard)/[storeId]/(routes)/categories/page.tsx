import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import React from "react";
import { CategoryClient } from "./components/client";
import { categoryColumn } from "./components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const Categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const formatedCategories: categoryColumn[] = Categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard?.label || "",
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      {" "}
      <div className="flex-1 space-y-4 py-5">
        <CategoryClient data={formatedCategories} />
      </div>{" "}
    </div>
  );
};

export default CategoriesPage;
