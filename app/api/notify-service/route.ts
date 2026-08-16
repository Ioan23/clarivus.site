import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, phone, service, details } = await request.json();
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ORDER_NOTIFICATION_EMAIL;
    if (!apiKey || !to) {
      console.error("Lipsește RESEND_API_KEY sau ORDER_NOTIFICATION_EMAIL");
      return Response.json({ ok: false, error: "config" }, { status: 500 });
    }
    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px">
        <h2 style="margin:0 0 4px">Cerere de programare — Servicii Clarivus</h2>
        <h3 style="margin:16px 0 4px">Client</h3>
        <p style="margin:0;line-height:1.6">
          <strong>${name}</strong><br/>
          Telefon: ${phone}
        </p>
        <h3 style="margin:16px 0 4px">Serviciu solicitat</h3>
        <p style="margin:0;line-height:1.6">${service}</p>
        ${details ? `<h3 style="margin:16px 0 4px">Detalii</h3><p style="margin:0;line-height:1.6">${details}</p>` : ""}
      </div>
    `;

    await resend.emails.send({
      from: "Clarivus <onboarding@resend.dev>",
      to: [to],
      subject: `Cerere serviciu — ${service} — ${name}`,
      html,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Eroare la trimiterea emailului:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}   