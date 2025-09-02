import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// create product
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeIds,   // array
      colorIds,  // array
      isFeatured,
      isArchived,
      images,
    } = body;

    console.log({ name, price, categoryId, images, colorIds, sizeIds, isFeatured, isArchived });

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) return new NextResponse("name is required", { status: 400 });
    if (!price) return new NextResponse("price is required", { status: 400 });
    if (!categoryId) return new NextResponse("category Id is required", { status: 400 });
    if (!sizeIds || !sizeIds.length) return new NextResponse("size Ids are required", { status: 400 });
    if (!colorIds || !colorIds.length) return new NextResponse("color Ids are required", { status: 400 });
    if (!images || !images.length) return new NextResponse("Images are required", { status: 400 });
    if (!params.storeId) return new NextResponse("store ID is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: { id: params.storeId, userId: userId },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        colors: {
          connect: colorIds.map((id: string) => ({ id })),
        },
        sizes: {
          connect: sizeIds.map((id: string) => ({ id })),
        },
      },
      include: {
        images: true,
        category: true,
        colors: true,
        sizes: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
        ...(colorId && { colors: { some: { id: colorId } } }),
        ...(sizeId && { sizes: { some: { id: sizeId } } }),
      },
      include: {
        images: true,
        category: true,
        colors: true,
        sizes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
