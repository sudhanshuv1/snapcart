export {};

declare global {
  interface Window {
    ourguide?: (command: string, payload?: unknown) => void;
  }
}
