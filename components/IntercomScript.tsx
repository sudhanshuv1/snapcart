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
    if (typeof window === "undefined" || !window.Intercom) return;

    if (user) {
      const token = getToken();
      window.Intercom("update", {
        app_id: APP_ID,
        user_id: user.id,
        name: user.name,
        email: user.email,
        ...(token ? { auth_tokens: { security_token: token } } : {}),
      });
    } else {
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
