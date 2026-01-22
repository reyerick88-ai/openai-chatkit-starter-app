"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  // ✅ PUENTE: cuando el Agent Builder llame la Function `appendTransfer`,
  // aquí se ejecuta realmente el POST hacia tu endpoint en Vercel.
  const handleClientTool = useCallback(async (toolCall: any) => {
    try {
      if (!toolCall || !toolCall.name) {
        return { ok: false, error: "INVALID_TOOL_CALL" };
      }

      if (toolCall.name === "appendTransfer") {
        const res = await fetch("/api/tools/appendTransfer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(toolCall.params ?? toolCall.arguments ?? {}),
        });

        const data = await res.json().catch(() => ({}));
        return data;
      }

      return { ok: false, error: "UNKNOWN_TOOL", name: toolCall.name };
    } catch (err: any) {
      return { ok: false, error: String(err) };
    }
  }, []);

  return (
    /* CAMBIADO A VERDE ESMERALDA (#064e3b) */
    <main
      className="flex min-h-screen flex-col items-center justify-end"
      style={{ backgroundColor: "#064e3b" }}
    >
      <div className="mx-auto w-full max-w-5xl">
        {/* LOGO (Se mantiene igual) */}
        <div className="flex justify-center mb-6">
          <img
            src="/LOGO-NEURO.jpeg"
            alt="Instituto NeuroInteligente"
            className="h-32 w-auto rounded-full shadow-lg border-4 border-white/10"
          />
        </div>

        <ChatKitPanel
          theme={scheme}
          onWidgetAction={handleWidgetAction}
          onResponseEnd={handleResponseEnd}
          onThemeRequest={setScheme}
          // ✅ AGREGA ESTA LÍNEA:
          onClientTool={handleClientTool}
        />
      </div>
    </main>
  );
}
