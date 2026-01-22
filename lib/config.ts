import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
 
  {
    label: "📸 Registrar transferencia (captura)",
    prompt: "Voy a registrar una transferencia. Te voy a subir UNA captura."
  },
  {
    label: "🧾 Registrar varias capturas (batch)",
    prompt: "Voy a subir VARIAS capturas de transferencias (una por una)."
  },
  {
    label: "🔗 Enviar link de pago",
    prompt: "Pásame el link de pago."
  }
  
];
export const PLACEHOLDER_INPUT = "Instituto NeuroInteligente";

export const GREETING = "¡Hola! Soy Neuro, tu asistente dental experto en analisis de datos. ¿En qué puedo ayudarte hoy?";

export const getThemeConfig = (theme: ColorScheme): ThemeOption => ({
  color: {
    grayscale: {
      hue: 220,
      tint: 6,
      shade: theme === "dark" ? -1 : -4,
    },
    accent: {
      primary: theme === "dark" ? "#f1f5f9" : "#0f172a",
      level: 1,
    },
  },
  radius: "round",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
