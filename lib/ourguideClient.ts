"use client";

type OurguideCommand = "identify" | "resetUser";

type OurguideIdentifyPayload = {
  token: string;
  name?: string;
};

function safeOurguideCall(command: OurguideCommand, payload?: OurguideIdentifyPayload) {
  if (typeof window === "undefined") return;
  const fn = window.ourguide;
  if (typeof fn !== "function") return;
  fn(command, payload);
}

export function ourguideIdentify(payload: OurguideIdentifyPayload) {
  safeOurguideCall("identify", payload);
}

export function ourguideResetUser() {
  safeOurguideCall("resetUser");
}
