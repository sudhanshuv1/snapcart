"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/lib/api";

const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "xido0746";

declare global {
  interface Window {
    Intercom?: (...args: unknown[]) => void;
    intercomSettings?: Record<string, unknown>;
  }
}

export default function IntercomScript() {
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as Window & { __intercomFetchPatched?: boolean };
    if (w.__intercomFetchPatched) return;
    w.__intercomFetchPatched = true;

    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      const isIntercom = url.includes("intercom.io");

      if (isIntercom && init?.body && typeof init.body === "string") {
        const body = init.body;
        const hasAuthTokens = body.includes("auth_tokens") || body.includes("security_token");
        if (hasAuthTokens) {
          const match = body.match(/security_token"?\s*[:=]\s*"?([^"&,}]+)/);
          console.log("[intercom] ✅ outgoing request contains security_token", {
            url,
            tokenPrefix: match?.[1]?.slice(0, 12) + "…",
            tokenLen: match?.[1]?.length,
          });
        }
      }
      return originalFetch(input, init);
    };
    console.log("[intercom] fetch patched to observe outgoing Intercom requests");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      console.log("[intercom] skip: no window");
      return;
    }
    if (!window.Intercom) {
      console.log("[intercom] skip: window.Intercom not ready");
      return;
    }

    if (user) {
      console.log("[intercom] identifying user", { user_id: user.id, email: user.email });
      window.Intercom("update", {
        app_id: APP_ID,
        user_id: user.id,
        name: user.name,
        email: user.email,
      });
      const token = getToken();
      if (token) {
        console.log("[intercom] setAuthTokens", {
          tokenLen: token.length,
          tokenPrefix: token.slice(0, 12) + "…",
        });
        window.Intercom("setAuthTokens", { security_token: token });
        console.log("[intercom] setAuthTokens call returned (fire-and-forget)");
      } else {
        console.warn("[intercom] no session token available — security_token NOT sent");
      }
    } else {
      console.log("[intercom] no user — shutdown + anonymous boot");
      window.Intercom("shutdown");
      window.Intercom("boot", { app_id: APP_ID });
    }
  }, [user?.id, user?.name, user?.email]);

  return (
    <>
      <Script id="intercom-settings" strategy="afterInteractive">
        {`window.intercomSettings = { api_base: "https://api-iam.intercom.io", app_id: "${APP_ID}" };`}
      </Script>
      <Script id="intercom-widget" strategy="afterInteractive">
        {`(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${APP_ID}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
      </Script>
    </>
  );
}
