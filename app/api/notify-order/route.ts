import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { orderId, customer, items, total } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.ORDER_NOTIFICATION_EMAIL;

    if (!apiKey || !to) {
      console.error("Lipsește RESEND_API_KEY sau ORDER_NOTIFICATION_EMAIL");
      return Response.json({ ok: false, error: "config" }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const lei = (bani: number) => (bani / 100).toFixed(2);

    const itemsHtml = (items ?? [])
      .map(
        (it: { name: string; brand?: string; price: number; qty: number }) =>
          `<tr>
            <td style="padding:4px 8px;border-bottom:1px solid #eee">${it.brand ? it.brand + " " : ""}${it.name}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;text-align:center">${it.qty}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;text-align:right">${lei(it.price * it.qty)} lei</td>
          </tr>`
      )
      .join("");

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px">
        <h2 style="margin:0 0 4px">Comandă nouă pe Clarivus</h2>
        <p style="color:#666;margin:0 0 16px">Comanda #${orderId}</p>

        <h3 style="margin:16px 0 4px">Client</h3>
        <p style="margin:0;line-height:1.6">
          <strong>${customer.name}</strong><br/>
          Telefon: ${customer.phone}<br/>
          Email: ${customer.email || "-"}<br/>
          Adresă: ${customer.address}, ${customer.city}, jud. ${customer.county}
          ${customer.notes ? `<br/>Observații: ${customer.notes}` : ""}
        </p>

        <h3 style="margin:16px 0 4px">Produse</h3>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          ${itemsHtml}
        </table>

        <p style="margin:16px 0 0;font-size:16px"><strong>Total: ${lei(total)} lei</strong></p>
        <p style="color:#666;margin:4px 0 0">Plată: ramburs (la livrare)</p>
      </div>
    `;

    await resend.emails.send({
      from: "Clarivus <onboarding@resend.dev>",
      to: [to],
      subject: `Comandă nouă #${orderId} — ${customer.name}`,
      html,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Eroare la trimiterea emailului:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}