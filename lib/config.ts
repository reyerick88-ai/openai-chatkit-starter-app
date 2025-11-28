import { ColorScheme, StartScreenPrompt, ThemeOption } from "@openai/chatkit";

export const WORKFLOW_ID =
  process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "💰 Precios",
    prompt: "¿Cuáles son los costos de los tratamientos básicos?",
    icon: "circle-question",
  },
  {
    label: "📅 Agendar Cita",
    prompt: "Quisiera información para agendar una cita.",
    icon: "circle-question",
  },
  {
    label: "📍 Ubicación",
    prompt: "¿Dónde están ubicados? ¿Me compartes la dirección?",
    icon: "circle-question",
  },
  {
    label: "⏰ Horarios",
    prompt: "¿Cuáles son sus horarios de atención?",
    icon: "circle-question",
  },
  {
    label: "🦷 Blanqueamiento",
    prompt: "Quiero saber más sobre el blanqueamiento dental.",
    icon: "circle-question",
  },
  {
    label: "📞 Llamar Ahora",
    prompt: "¿Me podrían pasar su número para marcarles?",
    icon: "circle-question",
  },
  {
    label: "📱 WhatsApp",
    prompt: "Hola, me gustaría contactarlos directamente por WhatsApp. ¿Me comparten el enlace?",
    icon: "circle-question",
  },
  {
    label: "💳 Formas de Pago",
    prompt: "¿Aceptan tarjetas de crédito o seguros?",
    icon: "circle-question",
  },
  {
    label: "📞 Hablar con Humano",
    prompt: "Necesito hablar con una persona real, por favor.",
    icon: "circle-question",
  },
  {
    label: "📝 Primera Vez",
    prompt: "Es mi primera vez ahí, ¿qué necesito llevar?",
    icon: "circle-question",
  },
];
export const PLACEHOLDER_INPUT = "Instituto NeuroInteligente";

export const GREETING = "¡Hola! Soy Neuro, tu asistente dental. ¿En qué puedo ayudarte hoy?";

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
  radius: "full",
  // Add other theme options here
  // chatkit.studio/playground to explore config options
});
