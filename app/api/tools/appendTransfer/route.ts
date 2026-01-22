import { NextResponse } from "next/server";

function norm(v: unknown) {
  const s = String(v ?? "NO_VISIBLE").trim();
  return s.length ? s : "NO_VISIBLE";
}

export async function POST(req: Request) {
  const url = process.env.SHEETS_WEBAPP_URL;
  const token = process.env.SHEETS_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ ok: false, error: "MISSING_ENV" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({}));

  const payload = {
    monto_mxn: norm((body as any).monto_mxn),
    fecha_hora: norm((body as any).fecha_hora),
    referencia_rastreo: norm((body as any).referencia_rastreo),
    banco_plataforma: norm((body as any).banco_plataforma),
    beneficiario_destino: norm((body as any).beneficiario_destino),
  };

  const res = await fetch(`${url}?token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.ok ? 200 : 500 });
}
