import { NextResponse } from "next/server";

type TransferPayload = {
  monto_mxn: string;
  fecha_hora: string;
  referencia_rastreo: string;
  banco_plataforma: string;
  beneficiario_destino: string;
};

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

  const body = (await req.json().catch(() => ({}))) as Partial<TransferPayload>;

  const payload: TransferPayload = {
    monto_mxn: norm(body.monto_mxn),
    fecha_hora: norm(body.fecha_hora),
    referencia_rastreo: norm(body.referencia_rastreo),
    banco_plataforma: norm(body.banco_plataforma),
    beneficiario_destino: norm(body.beneficiario_destino),
  };

  const res = await fetch(`${url}?token=${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.ok ? 200 : 500 });
}
