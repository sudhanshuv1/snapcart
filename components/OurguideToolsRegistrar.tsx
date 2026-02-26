"use client";

import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { apiPost } from "@/lib/api";

declare global {
  interface Window {
    ourguide: (action: string, payload?: unknown) => void;
  }
}

export function OurguideToolsRegistrar() {
  const { items, placeOrder, cartTotal } = useApp();
  useEffect(() => {
    const register = () => {
      if (typeof window.ourguide === "function") {
        console.log("[OurguideTools] Registering tools. Cart items:", items.length, "| Total:", cartTotal);
        window.ourguide("registerTools", {
          buyAllCartProducts: async () => {
            console.log("[OurguideTools] buyAllCartProducts called. Items:", items.length, "| Total:", cartTotal);

            if (items.length === 0) {
              console.warn("[OurguideTools] buyAllCartProducts → cart is empty");
              return { status: "error", error: "Your cart is empty." };
            }

            let orderId: string;
            try {
              orderId = await placeOrder(items, cartTotal);
              console.log("[OurguideTools] Order placed. orderId:", orderId);
            } catch (err) {
              console.error("[OurguideTools] placeOrder failed:", err);
              return { status: "error", error: "Failed to place order." };
            }

            try {
              const payment = await apiPost<{ success: boolean }>(
                "/api/payment/process",
                { orderId, amount: cartTotal },
              );
              console.log("[OurguideTools] Payment response:", payment);
              if (!payment.success) {
                console.warn("[OurguideTools] Payment not successful:", payment);
                return { status: "error", error: "Payment failed." };
              }
            } catch (err) {
              console.error("[OurguideTools] Payment request failed:", err);
              return { status: "error", error: "Payment request failed." };
            }

            const result = {
              status: "success",
              order_id: orderId,
              items_purchased: items.length,
              total: cartTotal,
            };
            console.log("[OurguideTools] buyAllCartProducts succeeded:", result);
            return result;
          },
        });
        console.log("[OurguideTools] Tools registered successfully.");
      } else {
        console.log("[OurguideTools] window.ourguide not ready, retrying in 150ms...");
        setTimeout(register, 2000);
      }
    };

    register();
  }, [items, placeOrder, cartTotal]);

  return null;
}
