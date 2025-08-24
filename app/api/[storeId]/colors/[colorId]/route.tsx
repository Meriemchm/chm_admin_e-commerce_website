// delete store

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("value is required", { status: 400 });
    }

    if (!params.colorId) {
      return new NextResponse("color ID is required", { status: 400 });
    }

    // Check if the store belongs to the user

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId: userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const color = await prismadb.color.updateMany({
      where: { id: params.colorId },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLOR_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string, colorId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.colorId) {
      return new NextResponse("color ID is required", { status: 400 });
    }

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLOR_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}



export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.error("[COLOR_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
