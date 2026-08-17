import { Resend } from "resend";

type Dioptrii = {
  odSph: string; odCyl: string; odAx: string;
  osSph: string; osCyl: string; osAx: string;
  pd: string; add: string;
};
type LensConfig = {
  lentila: { nume: string; index: string; pret: number };
  albastru: boolean;
  albastruPret: number;
  soare: { nume: string; pret: number } | null;
  reteta: {
    metoda: string;
    dioptrii: Dioptrii | null;
    pozaCale: string | null;
  };
};

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
    const leiInt = (n: number) => n.toLocaleString("ro-RO");

    function configHtml(cfg: LensConfig) {
      const linii: string[] = [];
      linii.push(
        `Lentile: <strong>${cfg.lentila.nume}</strong> (index ${cfg.lentila.index}) — ${leiInt(cfg.lentila.pret)} lei`
      );
      if (cfg.albastru) {
        linii.push(`Filtru lumină albastră — ${leiInt(cfg.albastruPret)} lei`);
      }
      if (cfg.soare) {
        linii.push(`${cfg.soare.nume} — ${leiInt(cfg.soare.pret)} lei`);
      }

      let reteta = "";
      if (cfg.reteta.metoda === "manual" && cfg.reteta.dioptrii) {
        const d = cfg.reteta.dioptrii;
        reteta =
          `<strong>Rețetă (introdusă manual):</strong><br/>` +
          `OD: SPH ${d.odSph || "—"} / CYL ${d.odCyl || "—"} / AX ${d.odAx || "—"}<br/>` +
          `OS: SPH ${d.osSph || "—"} / CYL ${d.osCyl || "—"} / AX ${d.osAx || "—"}<br/>` +
          `PD: ${d.pd || "—"}${d.add ? ` · ADD: ${d.add}` : ""}`;
      } else if (cfg.reteta.metoda === "poza" && cfg.reteta.pozaCale) {
        reteta =
          `<strong>Rețetă (poză încărcată):</strong><br/>` +
          `<a href="${cfg.reteta.pozaCale}" style="color:#c6a253">Deschide poza cu rețeta</a>`;
      } else {
        reteta = `<strong>Rețetă:</strong> consultație / clientul aduce rețeta la magazin`;
      }

      return `
        <div style="margin:6px 0 0;padding:10px 12px;background:#faf8f3;border-radius:8px;font-size:13px;line-height:1.6">
          ${linii.join("<br/>")}
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid #ececec">${reteta}</div>
        </div>`;
    }

    const itemsHtml = (items ?? [])
      .map((it: {
        name: string; brand?: string; price: number; qty: number; config?: LensConfig;
      }) => {
        const rand = `<tr>
            <td style="padding:4px 8px;border-bottom:1px solid #eee">${it.brand ? it.brand + " " : ""}${it.name}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;text-align:center">${it.qty}</td>
            <td style="padding:4px 8px;border-bottom:1px solid #eee;text-align:right">${lei(it.price * it.qty)} lei</td>
          </tr>`;
        const detalii = it.config
          ? `<tr><td colspan="3" style="padding:0 8px 8px">${configHtml(it.config)}</td></tr>`
          : "";
        return rand + detalii;
      })
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