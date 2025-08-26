import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { ReactNode } from "react";

interface DashCardProps {
  data: {
    name: string;
    value: string | number;
    icon: ReactNode;
  };
}

const DashCard: React.FC<DashCardProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-6">
        <CardTitle>{data.name} </CardTitle>
        {data.icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {data.name === "Total Revenue"
            ? formatter.format(Number(data.value))
            : data.value}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashCard;
