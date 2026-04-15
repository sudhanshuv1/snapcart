import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db/mongoose";
import Order from "@/lib/db/models/Order";
import Cart from "@/lib/db/models/Cart";
import Product from "@/lib/db/models/Product";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    console.log("[orders] auth debug", {
      ua: request.headers.get("user-agent"),
      hasAuthHeader: !!authHeader,
      authHeaderLen: authHeader?.length ?? 0,
      authPrefix: authHeader?.slice(0, 14),
      hasCookie: !!request.cookies.get("shopclone-session"),
    });
    const user = await getAuthUser(request);
    if (!user) {
      console.log("[orders] auth failed — getAuthUser returned null");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await dbConnect();

    const orders = await Order.find({ userId: user._id })
      .sort({ date: -1 })
      .lean();

    const mapped = orders.map((o) => ({
      id: o.orderId,
      items: o.items,
      total: o.total,
      date: o.date,
      status: o.status,
    }));

    return NextResponse.json({ orders: mapped });
  } catch (error) {
    console.error("Get orders error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { items, total } = await request.json();

    if (!items?.length || total === undefined) {
      return NextResponse.json({ error: "Items and total are required" }, { status: 400 });
    }

    await dbConnect();

    // Look up full product details for each item
    const enrichedItems = await Promise.all(
      items.map(async (item: { product: { id: number }; quantity: number }) => {
        const product = await Product.findOne({ productId: item.product.id }).lean();
        if (!product) {
          throw new Error(`Product with id ${item.product.id} not found`);
        }
        return {
          product: {
            id: product.productId,
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
          },
          quantity: item.quantity,
        };
      })
    );

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const orderId = `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    const order = await Order.create({
      orderId,
      userId: user._id,
      items: enrichedItems,
      total,
      status: "delivered",
      date: new Date().toISOString(),
    });

    // Clear the user's cart after order placement
    await Cart.findOneAndUpdate({ userId: user._id }, { items: [] });

    return NextResponse.json(
      {
        order: {
          id: order.orderId,
          items: order.items,
          total: order.total,
          date: order.date,
          status: order.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create order error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
