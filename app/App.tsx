"use client";

import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";

type ToolCall = {
  name: string;
  params?: unknown;
  arguments?: unknown;
};

type ToolResult = Record<string, unknown>;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

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

  // ✅ PUENTE: ejecuta tools reales
  const handleClientTool = useCallback(
    async (toolCall: ToolCall): Promise<ToolResult> => {
      try {
        if (!toolCall?.name) return { ok: false, error: "INVALID_TOOL_CALL" };

        // Preferimos params; si viene arguments lo aceptamos también
        const payload: Record<string, unknown> = isRecord(toolCall.params)
          ? toolCall.params
          : isRecord(toolCall.arguments)
          ? toolCall.arguments
          : {};

        if (toolCall.name === "appendTransfer") {
          const res = await fetch("/api/tools/appendTransfer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          const data = (await res.json().catch(() => ({}))) as ToolResult;

          // 🔥 CLAVE: valida HTTP + data.ok (si falla, regresamos error real)
          if (!res.ok || data.ok !== true) {
            return {
              ok: false,
              error: String((data as any)?.error ?? `HTTP_${res.status}`),
              status: res.status,
              raw: data,
            };
          }

          return data;
        }

        return { ok: false, error: "UNKNOWN_TOOL", name: toolCall.name };
      } catch (err) {
        return { ok: false, error: String(err) };
      }
    },
    []
  );

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-end"
      style={{ backgroundColor: "#064e3b" }}
    >
      <div className="mx-auto w-full max-w-5xl">
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
          onClientTool={handleClientTool}
        />
      </div>
    </main>
  );
}
