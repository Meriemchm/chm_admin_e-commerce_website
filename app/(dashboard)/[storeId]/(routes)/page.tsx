import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import DashCard from "@/components/dash-card";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { WelcomeCard } from "@/components/welcome-card";
import { CreditCard, EuroIcon, Package } from "lucide-react";


import React from "react";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId)
  

  const dashItems = [
    {
      id: 1,
      name: "Total Revenue",
      value: totalRevenue,
      icon: <EuroIcon className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 2,
      name: "Sales",
      value: "+" + salesCount,
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
    },
    {
      id: 3,
      name: "Products In Stock",
      value: stockCount,
      icon: <Package className="h-4 w-4 text-muted-foreground" />,
    },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 py-5">


        <Heading title={"Dashboard"} description={"Overview of your store."} />


        <WelcomeCard  />


        <div className="grid gap-4 grid-cols-3">
          {dashItems.map((item) => (
            <DashCard key={item.id} data={item} />
          ))}
        </div>


        <Card className="col-span-4 ">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
