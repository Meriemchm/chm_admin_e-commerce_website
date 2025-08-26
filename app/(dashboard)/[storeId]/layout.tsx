import Sidebar from "@/components/Sidebar/Sidebar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ storeId: string }>; 
}) {
  const { storeId } = await params; 
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64">
          <Sidebar />
        </div>

        {/* Contenu */}
        <div className="flex-1 px-5">{children}</div>
      </div>
    </>
  );
}
