import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate?: string;
  languages?: string;
  participants?: string;
  message?: string;
}

const eventTypeLabels: Record<string, string> = {
  congresso: "Congresso Médico/Científico",
  simposio: "Simpósio",
  treinamento: "Treinamento Internacional",
  lancamento: "Lançamento de Produto",
  roadshow: "Roadshow de Investidores",
  corporativo: "Evento Corporativo",
  outro: "Outro",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: QuoteRequest = await req.json();

    // Server-side validation
    if (!data.name?.trim() || !data.email?.trim() || !data.phone?.trim() || !data.eventType?.trim()) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return new Response(
        JSON.stringify({ error: "E-mail inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Serviço de e-mail não configurado." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const eventLabel = eventTypeLabels[data.eventType] || data.eventType;

    const htmlBody = `
      <h2>Nova Solicitação de Orçamento</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Nome</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">E-mail</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Telefone</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.phone)}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Tipo de Evento</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(eventLabel)}</td></tr>
        ${data.eventDate ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Data do Evento</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.eventDate)}</td></tr>` : ""}
        ${data.languages ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Idiomas</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.languages)}</td></tr>` : ""}
        ${data.participants ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Participantes</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.participants)}</td></tr>` : ""}
        ${data.message ? `<tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Mensagem</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(data.message)}</td></tr>` : ""}
      </table>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tradupoints <onboarding@resend.dev>",
        to: ["vendas@tradupoints.com.br"],
        subject: "Form: orçamento",
        html: htmlBody,
        reply_to: data.email.trim(),
      }),
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend error:", resendData);
      return new Response(
        JSON.stringify({ error: "Falha ao enviar e-mail." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: resendData.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
