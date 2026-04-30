"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getToken } from "@/lib/api";

const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID || "hhec07jb";

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

    const inspectBody = (url: string, method: string, body: unknown) => {
      let bodyStr = "";
      if (typeof body === "string") bodyStr = body;
      else if (body instanceof URLSearchParams) bodyStr = body.toString();
      else if (body instanceof FormData) {
        const entries: string[] = [];
        body.forEach((v, k) => entries.push(`${k}=${typeof v === "string" ? v : "[file]"}`));
        bodyStr = entries.join("&");
      }

      const hasAuthTokens = bodyStr.includes("auth_tokens") || bodyStr.includes("security_token");
      const snippet = bodyStr.slice(0, 300);
      console.log(
        `[intercom] ${hasAuthTokens ? "✅" : "→"} ${method} ${url}`,
        { bodyLen: bodyStr.length, snippet, hasAuthTokens }
      );
      if (hasAuthTokens) {
        const match = bodyStr.match(/security_token[^a-zA-Z0-9]+([A-Za-z0-9._-]+)/);
        console.log("[intercom] 🎯 security_token delivered to Intercom", {
          url,
          tokenPrefix: match?.[1]?.slice(0, 12) + "…",
          tokenLen: match?.[1]?.length,
        });
      }
    };

    // Patch fetch
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input, init) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (url.includes("intercom")) {
        inspectBody(url, init?.method || "GET", init?.body);
      }
      return originalFetch(input, init);
    };

    // Patch XMLHttpRequest
    const OriginalXHR = window.XMLHttpRequest;
    const PatchedXHR = function (this: XMLHttpRequest) {
      const xhr = new OriginalXHR();
      let reqUrl = "";
      let reqMethod = "GET";
      const origOpen = xhr.open.bind(xhr);
      (xhr as XMLHttpRequest).open = function (method: string, url: string | URL) {
        reqMethod = method;
        reqUrl = typeof url === "string" ? url : url.href;
        // eslint-disable-next-line prefer-rest-params
        return origOpen.apply(xhr, arguments as unknown as Parameters<XMLHttpRequest["open"]>);
      } as XMLHttpRequest["open"];
      const origSend = xhr.send.bind(xhr);
      (xhr as XMLHttpRequest).send = function (body?: Document | XMLHttpRequestBodyInit | null) {
        if (reqUrl.includes("intercom")) {
          inspectBody(reqUrl, reqMethod, body);
        }
        return origSend(body as XMLHttpRequestBodyInit);
      };
      return xhr;
    } as unknown as typeof XMLHttpRequest;
    PatchedXHR.prototype = OriginalXHR.prototype;
    window.XMLHttpRequest = PatchedXHR;

    console.log("[intercom] fetch + XHR patched to observe outgoing Intercom requests");
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
      <script>
  {`// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/hhec07jb'
  (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/hhec07jb';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();`}
</script>
    </>
  );
}

