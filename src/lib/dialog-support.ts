/** Opening and dismissal must both exist before using a native modal. */
export function supportsModalDialog(dialog: {
  showModal?: unknown;
  close?: unknown;
}): boolean {
  return typeof dialog.showModal === "function" && typeof dialog.close === "function";
}
