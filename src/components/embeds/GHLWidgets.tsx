"use client";

import { useEffect } from "react";

/**
 * GoHighLevel AI chat and voice assistant embeds.
 * Renders when embed IDs are provided via environment variables.
 */
export function GHLWidgets() {
  const chatId = process.env.NEXT_PUBLIC_GHL_EMBED_CHAT_ID;
  const voiceId = process.env.NEXT_PUBLIC_GHL_EMBED_VOICE_ID;

  useEffect(() => {
    if (!chatId && !voiceId) return;

    if (chatId) {
      const existing = document.getElementById("ghl-chat-script");
      if (!existing) {
        const script = document.createElement("script");
        script.id = "ghl-chat-script";
        script.src = `https://widgets.leadconnectorhq.com/loader.js`;
        script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
        script.setAttribute("data-widget-id", chatId);
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [chatId, voiceId]);

  if (!chatId && !voiceId) return null;

  return (
    <>
      {chatId && <div id="ghl-chat-widget" />}
      {voiceId && <div id="ghl-voice-widget" />}
    </>
  );
}
