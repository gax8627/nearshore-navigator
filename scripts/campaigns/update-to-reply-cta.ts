import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function wrapHtml(body: string, ctaText: string, ctaUrl: string): string {
  const green = '#10B981';
  const dark = '#020617';
  const glass = '#0F172A';
  const border = '#1E293B';
  const muted = '#94A3B8';
  const banner = 'https://nearshorenavigator.com/images/denisse-banner.jpg?v=JUN15';

  return `
<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${dark}" style="background-color:${dark};table-layout:fixed;">
<tr><td align="center" style="padding:60px 10px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;border-radius:32px;overflow:hidden;border:1px solid ${border};" bgcolor="${glass}">
<tr><td height="12" bgcolor="${green}"></td></tr>
<tr><td style="padding:56px 48px;">

<!-- Logo -->
<table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:48px;">
<tr>
<td width="42" valign="middle">
<table border="0" cellpadding="0" cellspacing="0" bgcolor="${green}" style="border-radius:12px;width:42px;height:42px;">
<tr><td align="center" style="color:#000;font-family:sans-serif;font-weight:900;font-size:24px;line-height:42px;">N</td></tr>
</table></td>
<td style="padding-left:16px;font-family:sans-serif;font-size:22px;font-weight:700;color:#fff;text-transform:uppercase;">
Nearshore <span style="color:${green};">Navigator</span></td>
</tr></table>

<!-- Body -->
<div style="font-family:sans-serif;font-size:17px;line-height:1.8;color:${muted};margin-bottom:48px;">
${body}
</div>

<!-- CTA -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:48px;">
<tr><td align="center" bgcolor="${green}" style="border-radius:16px;">
<a href="${ctaUrl}" style="display:block;padding:22px 48px;text-decoration:none;color:#000;font-weight:800;font-family:sans-serif;font-size:15px;text-transform:uppercase;letter-spacing:1px;">
${ctaText}
</a></td></tr></table>

<!-- Signature banner -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="center">
<img src="${banner}" width="544" style="display:block;width:100%;height:auto;border-radius:16px;border:0;" alt="Denisse Martinez — Nearshore Navigator" />
</td></tr></table>

<!-- Footer -->
<div style="margin-top:40px;text-align:center;font-family:sans-serif;font-size:11px;color:#475569;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
Nearshore Navigator &bull; Baja California Manufacturing Intelligence &bull;
<a href="mailto:denisse@nearshorenavigator.com?subject=Unsubscribe" style="color:#475569;text-decoration:none;">Unsubscribe</a>
</div>

</td></tr></table>
</td></tr></table>`;
}

const CAMPAIGNS = {
  37: { // General
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The USMCA joint review starts July 1st. The likely outcome: tighter North American content rules and new scrutiny on Chinese-origin components in manufactured goods.</p>
<p>Most manufacturers haven't run the math on what tighter Rules of Origin mean for their cost model — especially if their supply chain includes Chinese sub-assemblies routed through third countries.</p>
<p>We help US manufacturers establish USMCA-qualified Baja California production before rule changes take effect. 20 minutes from San Diego, duty-free.</p>
<p>Would a shortlist of 3 vetted Baja manufacturing partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Manufacturing%20Partner%20Shortlist',
  },
  35: { // Electronics
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The USMCA review launching July 1 is targeting exactly what most electronics manufacturers rely on: Chinese-origin PCBs, chips, and modules assembled in Mexico or routed through third countries.</p>
<p>New proposed rules would exclude Chinese-origin components from North American content calculations entirely — changing the landed-cost math significantly for anyone still sourcing from China.</p>
<p>We've placed electronics manufacturers in Baja California SMT facilities that qualify under current and proposed rules. 20 min from San Diego, USMCA-clean.</p>
<p>Would a shortlist of 3 vetted Baja electronics assembly partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Electronics%20Partner%20Shortlist',
  },
  33: { // Aerospace
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The July 1 USMCA review is bringing increased CBP audit activity on aerospace and defense component imports — particularly sub-assemblies with non-North American inputs.</p>
<p>AS9100-certified contract manufacturers in Baja California are positioned as a USMCA-qualifying alternative: 20 minutes from the San Diego border, with ITAR-compatible facility options and existing prime supplier relationships.</p>
<p>Would a shortlist of 3 vetted Baja aerospace manufacturing partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Aerospace%20Partner%20Shortlist',
  }
};

async function main() {
  const { brevo } = await import('../../lib/brevo');
  console.log('📝 Updating campaigns to use reply-based mailto CTAs in Brevo...');

  for (const [idStr, cdata] of Object.entries(CAMPAIGNS)) {
    const id = parseInt(idStr);
    const html = wrapHtml(cdata.body, cdata.cta, cdata.ctaUrl);

    try {
      console.log(`  Updating campaign ${id}...`);
      await brevo.updateCampaign(id, { htmlContent: html });
      console.log(`  ✅ Campaign ${id} updated successfully.`);
    } catch (e: any) {
      console.error(`  ❌ Failed to update campaign ${id}: ${e.message}`);
    }
  }

  console.log('\n🎉 Update complete.');
}

main().catch(console.error);
