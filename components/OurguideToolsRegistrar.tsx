"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useAuth } from "@/context/AuthContext";
import { apiPost, hasToken } from "@/lib/api";

const ISSUE_TYPE_TO_LABEL: Record<
  "order" | "return" | "shipping" | "payment" | "account" | "product" | "other",
  string
> = {
  order: "Order issue",
  return: "Return / refund",
  shipping: "Shipping question",
  payment: "Payment problem",
  account: "Account help",
  product: "Product question",
  other: "Other",
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitFor<T>(
  getValue: () => T | null | undefined,
  opts?: { timeoutMs?: number; intervalMs?: number }
): Promise<T | null> {
  const timeoutMs = opts?.timeoutMs ?? 8000;
  const intervalMs = opts?.intervalMs ?? 60;
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = getValue();
    if (value) return value;
    await sleep(intervalMs);
  }
  return null;
}

function setNativeValue(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), "value");
  descriptor?.set?.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}

declare global {
  interface Window {
    ourguide?: (action: string, payload?: unknown) => void;
  }
}

export function OurguideToolsRegistrar() {
  const { items, placeOrder, cartTotal } = useApp();
  const { user, isAuthenticated, updateProfile } = useAuth();
  const router = useRouter();
  useEffect(() => {
    async function navigateTo(path: string) {
      if (typeof window === "undefined") return;
      if (window.location.pathname !== path) {
        router.push(path);
      }
      // Wait until the route is reflected + the page has rendered.
      await waitFor(() => (window.location.pathname === path ? true : null), { timeoutMs: 6000 });
    }

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

          submitCustomerServiceQuery: async (input?: {
            name?: string;
            email?: string;
            issueType: "order" | "return" | "shipping" | "payment" | "account" | "product" | "other";
            priority?: "low" | "medium" | "high";
            orderNumber?: string;
            message: string;
          }) => {
            try {
              const payload = input ?? ({} as never);
              const issueType = payload.issueType;
              const priority = payload.priority ?? "medium";
              const message = (payload.message ?? "").trim();

              if (!issueType) {
                return { status: "error", error: "issueType is required." };
              }
              if (!message) {
                return { status: "error", error: "message is required." };
              }
              if (message.length < 10) {
                return { status: "error", error: "Message should be at least 10 characters." };
              }

              await navigateTo("/help");

              // Ensure support form exists
              const supportForm = await waitFor(
                () => document.getElementById("support-form") as HTMLDivElement | null,
                { timeoutMs: 8000 }
              );
              if (!supportForm) {
                return { status: "error", error: "Support form not found on /help." };
              }

              supportForm.scrollIntoView({ behavior: "smooth", block: "start" });
              await sleep(120);

              const nameEl = document.getElementById("support-name") as HTMLInputElement | null;
              const emailEl = document.getElementById("support-email") as HTMLInputElement | null;
              const orderEl = document.getElementById("support-order") as HTMLInputElement | null;
              const messageEl = document.getElementById("support-message") as HTMLTextAreaElement | null;

              if (!nameEl || !emailEl || !messageEl) {
                return { status: "error", error: "One or more required form fields are missing." };
              }

              const finalName = (payload.name ?? user?.name ?? "").trim();
              const finalEmail = (payload.email ?? user?.email ?? "").trim();
              const finalOrder = (payload.orderNumber ?? "").trim();

              if (finalName) setNativeValue(nameEl, finalName);
              if (finalEmail) setNativeValue(emailEl, finalEmail);
              if (orderEl) setNativeValue(orderEl, finalOrder);
              setNativeValue(messageEl, message);

              // Select Issue Type via the custom Listbox.
              const label = ISSUE_TYPE_TO_LABEL[issueType];
              const issueTypeLabelNode = Array.from(supportForm.querySelectorAll("span"))
                .find((s) => (s.textContent ?? "").trim() === "Issue Type");

              const listboxContainer = issueTypeLabelNode?.closest("div");
              const listboxToggle = listboxContainer?.querySelector("button[aria-expanded]") as HTMLButtonElement | null;
              if (!listboxToggle) {
                return { status: "error", error: "Issue Type selector not found." };
              }
              listboxToggle.click();

              const optionButton = await waitFor(
                () => {
                  const buttons = Array.from(supportForm.querySelectorAll("button"));
                  return (
                    buttons.find((b) => {
                      const firstP = b.querySelector("p");
                      const optionLabel = (firstP?.textContent ?? "").trim();
                      return optionLabel === label;
                    }) as HTMLButtonElement | undefined
                  ) ?? null;
                },
                { timeoutMs: 3000 }
              );

              if (!optionButton) {
                return { status: "error", error: `Could not find Issue Type option: ${label}` };
              }
              optionButton.click();

              // Priority (button group)
              const priorityLabel = priority === "low" ? "Low" : priority === "high" ? "High" : "Medium";
              const priorityButton = Array.from(supportForm.querySelectorAll("button"))
                .find((b) => (b.textContent ?? "").trim() === priorityLabel) as HTMLButtonElement | undefined;
              priorityButton?.click();

              // Submit
              const submitBtn = supportForm.querySelector('button[type="submit"]') as HTMLButtonElement | null;
              if (!submitBtn) {
                return { status: "error", error: "Submit button not found." };
              }
              submitBtn.click();

              const toastAppeared = await waitFor(
                () => (supportForm.textContent?.includes("Support request submitted") ? true : null),
                { timeoutMs: 6000, intervalMs: 80 }
              );

              if (!toastAppeared) {
                // If validation failed, the form stays on the page; give a more helpful error.
                return { status: "error", error: "Support request may not have been submitted (no success toast)." };
              }

              return {
                status: "success",
                route: "/help",
                issueType,
                priority,
              };
            } catch (err) {
              const message = err instanceof Error ? err.message : "Handler failed";
              return { status: "error", error: message };
            }
          },

          updateShippingAddress: async (input?: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
            navigateTo?: "none" | "account" | "checkout";
          }) => {
            // Don't rely solely on `isAuthenticated` here: toolcalls can arrive before AuthContext finishes hydrating.
            // If there's no token AND the app thinks we're signed out, we can safely require auth.
            if (!hasToken() && !isAuthenticated) {
              router.push("/signin");
              return { status: "needs_auth", route: "/signin", error: "You need to sign in to update your address." };
            }

            const street = (input?.street ?? "").trim();
            const city = (input?.city ?? "").trim();
            const state = (input?.state ?? "").trim();
            const zipCode = (input?.zipCode ?? "").trim();
            const country = (input?.country ?? "").trim();

            if (!street || !city || !state || !zipCode || !country) {
              return { status: "error", error: "street, city, state, zipCode, and country are required." };
            }

            // Prefer driving the UI form so the tool works end-to-end like a real user.
            await navigateTo("/account");

            if (typeof window !== "undefined" && window.location.pathname === "/signin") {
              return { status: "needs_auth", route: "/signin", error: "You need to sign in to update your address." };
            }

            const saveBtn = await waitFor(
              () => document.getElementById("save-shipping-address") as HTMLButtonElement | null,
              { timeoutMs: 8000 }
            );

            const streetEl = document.getElementById("shipping-street") as HTMLInputElement | null;
            const cityEl = document.getElementById("shipping-city") as HTMLInputElement | null;
            const stateEl = document.getElementById("shipping-state") as HTMLInputElement | null;
            const zipEl = document.getElementById("shipping-zipCode") as HTMLInputElement | null;
            const countryEl = document.getElementById("shipping-country") as HTMLInputElement | null;

            const canDriveForm = !!saveBtn && !!streetEl && !!cityEl && !!stateEl && !!zipEl && !!countryEl;

            if (canDriveForm) {
              document.getElementById("shipping-address-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              await sleep(120);

              // Fill fields one-by-one to mimic real user interaction.
              const fillStep = async (el: HTMLInputElement, value: string) => {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
                el.focus();
                await sleep(140);
                setNativeValue(el, value);
                await sleep(280);
                el.blur();
                await sleep(160);
              };

              await fillStep(streetEl!, street);
              await fillStep(cityEl!, city);
              await fillStep(stateEl!, state);
              await fillStep(zipEl!, zipCode);
              await fillStep(countryEl!, country);

              // Final action: click Save Address.
              saveBtn!.scrollIntoView({ behavior: "smooth", block: "center" });
              saveBtn!.focus();
              await sleep(200);
              saveBtn!.click();

              const savedToast = await waitFor(
                () => (document.body.textContent?.includes("Shipping address saved") ? true : null),
                { timeoutMs: 6000, intervalMs: 80 }
              );

              if (!savedToast) {
                return { status: "error", error: "Address may not have been saved (no success toast)." };
              }
            } else {
              // Fallback: update via API directly if UI changes or fails to render.
              const result = await updateProfile({
                address: { street, city, state, zipCode, country },
              });

              if (!result.success) {
                const err = result.error ?? "Failed to update address.";
                if (/not authenticated|unauthorized/i.test(err)) {
                  router.push("/signin");
                  return { status: "needs_auth", route: "/signin", error: "You need to sign in to update your address." };
                }
                return { status: "error", error: err };
              }
            }

            const navigateAfter = input?.navigateTo ?? "none";
            if (navigateAfter === "checkout") await navigateTo("/checkout");
            if (navigateAfter === "account") await navigateTo("/account");

            return {
              status: "success",
              street,
              city,
              state,
              zipCode,
              country,
            };
          },
        });
        console.log("[OurguideTools] Tools registered successfully.");
      } else {
        console.log("[OurguideTools] window.ourguide not ready, retrying in 150ms...");
        setTimeout(register, 2000);
      }
    };

    register();
  }, [items, placeOrder, cartTotal, isAuthenticated, router, updateProfile, user?.email, user?.name]);

  return null;
}
