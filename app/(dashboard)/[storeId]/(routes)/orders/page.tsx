import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { OrderClient } from "./components/client";
import { orderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formatedOrders: orderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    adress: item.address,
    isPaid: item.isPaid,
    products: item.orderItems.map((order) => order.product.name).join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price) * item.quantity;
      }, 0)
    ),

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      {" "}
      <div className="flex-1 space-y-4 py-5">
        <OrderClient data={formatedOrders} />
      </div>{" "}
    </div>
  );
};

export default OrdersPage;
