export type ChatbaseFunction = {
  (...args: unknown[]): unknown;
  q?: unknown[];
};

declare global {
  interface Window {
    chatbase?: ChatbaseFunction;
  }
}

export const CHATBASE_SCRIPT_ID = "jr_7Bmw7q5zBtpoQi3CGk";

export function openChatbase() {
  if (typeof window === "undefined" || !window.chatbase) {
    return;
  }

  window.chatbase("open");
}
