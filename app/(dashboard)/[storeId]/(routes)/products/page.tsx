import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { productColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      sizes: true,
      colors: true,
    },
    orderBy: { createdAt: "desc" },
  });

  const formatedProducts: productColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: formatter.format(item.price.toNumber()),
    category: item.category?.name ?? null,
    size: item.sizes.map((s) => s.name).join(", ") || null,
    color: item.colors.map((c) => c.value) || [],
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      {" "}
      <div className="flex-1 space-y-4 py-5">
        <ProductClient data={formatedProducts} />
      </div>{" "}
    </div>
  );
};

export default ProductsPage;
