import dotenv from 'dotenv';
import path from 'path';

// Note: Loading the .env.local file from the project root
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

function wrapHtml(body: string, ctaText: string, ctaUrl: string, campaignName: string): string {
  const green = '#10B981';
  const dark = '#020617';
  const glass = '#0F172A';
  const border = '#1E293B';
  const muted = '#94A3B8';
  const banner = 'https://nearshorenavigator.com/images/denisse-banner.jpg?v=JUN15';
  
  // UTM Parameters specific to each niche campaign
  const utmParams = `?utm_source=brevo&utm_medium=email&utm_campaign=${campaignName}`;
  const siteUrl = `https://nearshorenavigator.com/${utmParams}`;

  return `
<table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="${dark}" style="background-color:${dark};table-layout:fixed;">
<tr><td align="center" style="padding:60px 10px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:640px;border-radius:32px;overflow:hidden;border:1px solid ${border};" bgcolor="${glass}">
<tr><td height="12" bgcolor="${green}"></td></tr>
<tr><td style="padding:56px 48px;">

<!-- Logo (Hyperlinked with UTM) -->
<table border="0" cellpadding="0" cellspacing="0" style="margin-bottom:48px;">
<tr>
<td width="42" valign="middle">
<table border="0" cellpadding="0" cellspacing="0" bgcolor="${green}" style="border-radius:12px;width:42px;height:42px;">
<tr><td align="center" style="color:#000;font-family:sans-serif;font-weight:900;font-size:24px;line-height:42px;">N</td></tr>
</table></td>
<td style="padding-left:16px;font-family:sans-serif;font-size:22px;font-weight:700;color:#fff;text-transform:uppercase;">
<a href="${siteUrl}" style="color:#fff;text-decoration:none;">
Nearshore <span style="color:${green};">Navigator</span>
</a></td>
</tr></table>

<!-- Body -->
<div style="font-family:sans-serif;font-size:17px;line-height:1.8;color:${muted};margin-bottom:48px;">
${body}
</div>

<!-- CTA (Direct mailto reply, remains untouched) -->
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:48px;">
<tr><td align="center" bgcolor="${green}" style="border-radius:16px;">
<a href="${ctaUrl}" style="display:block;padding:22px 48px;text-decoration:none;color:#000;font-weight:800;font-family:sans-serif;font-size:15px;text-transform:uppercase;letter-spacing:1px;">
${ctaText}
</a></td></tr></table>

<!-- Signature banner (Hyperlinked with UTM) -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr><td align="center">
<a href="${siteUrl}">
<img src="${banner}" width="544" style="display:block;width:100%;height:auto;border-radius:16px;border:0;" alt="Denisse Martinez — Nearshore Navigator" />
</a>
</td></tr></table>

<!-- Footer (Hyperlinked with UTM) -->
<div style="margin-top:40px;text-align:center;font-family:sans-serif;font-size:11px;color:#475569;letter-spacing:2px;text-transform:uppercase;font-weight:700;">
<a href="${siteUrl}" style="color:#475569;text-decoration:none;">Nearshore Navigator</a> &bull; Baja California Manufacturing Intelligence &bull;
<a href="mailto:denisse@nearshorenavigator.com?subject=Unsubscribe" style="color:#475569;text-decoration:none;">Unsubscribe</a>
</div>

</td></tr></table>
</td></tr></table>`;
}

const CAMPAIGNS = {
  39: {
    niche: 'Medical',
    campaignName: 'usmca_week3_medical',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>With the USMCA joint review starting July 1, CBP is increasing scrutiny on medical device imports — specifically Chinese-origin components in sub-assemblies.</p>
<p>Baja California hosts one of the largest medical device manufacturing clusters in the world: ISO 13485 and FDA-registered facilities within 30 minutes of the U.S. border, fully USMCA-qualifying.</p>
<p>I can put together a shortlist of 3 vetted partners matched to {{contact.COMPANY}}'s production profile. Just reply "yes" — no call needed, I'll send the PDF.</p>`,
    cta: 'Reply Yes for the PDF',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Medical%20Device%20Partner%20Shortlist',
  },
  40: {
    niche: 'Electronics',
    campaignName: 'usmca_week3_electronics',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The USMCA review launching July 1 is targeting exactly what most electronics manufacturers rely on: Chinese-origin PCBs, chips, and modules assembled in Mexico or routed through third countries.</p>
<p>New proposed rules would exclude Chinese-origin components from North American content calculations entirely — changing the landed-cost math significantly for anyone still sourcing from China.</p>
<p>We've placed electronics manufacturers in Baja California SMT facilities that qualify under current and proposed rules. 20 min from San Diego, USMCA-clean.</p>
<p>Would a shortlist of 3 vetted Baja electronics assembly partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Electronics%20Partner%20Shortlist',
  },
  41: {
    niche: 'Automotive',
    campaignName: 'usmca_week3_automotive',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The July USMCA review is expected to push Regional Value Content (RVC) thresholds higher for auto parts — and introduce mandatory third-party verification replacing self-certification.</p>
<p>Manufacturers still relying on Asian sub-assemblies face the most exposure. USMCA-qualified production in Baja California eliminates the risk and cuts landed cost vs. the current tariff structure.</p>
<p>Would a shortlist of 3 vetted Baja stamping/machining/sub-assembly partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Auto%20Parts%20Shortlist',
  },
  42: {
    niche: 'General',
    campaignName: 'usmca_week3_general',
    body: `<p>Hi {{contact.FIRSTNAME}},</p>
<p>The USMCA joint review starts July 1st. The likely outcome: tighter North American content rules and new scrutiny on Chinese-origin components in manufactured goods.</p>
<p>Most manufacturers haven't run the math on what tighter Rules of Origin mean for their cost model — especially if their supply chain includes Chinese sub-assemblies routed through third countries.</p>
<p>We help US manufacturers establish USMCA-qualified Baja California production before rule changes take effect. 20 minutes from San Diego, duty-free.</p>
<p>Would a shortlist of 3 vetted Baja manufacturing partners be useful for {{contact.COMPANY}}? Just reply "yes."</p>`,
    cta: 'Reply Yes',
    ctaUrl: 'mailto:denisse@nearshorenavigator.com?subject=Yes%20-%20Baja%20Manufacturing%20Partner%20Shortlist',
  }
};

async function main() {
  const { brevo } = await import('../../lib/brevo');
  console.log('📌 Updating Week 3 campaigns with UTM links on Logo, Banner and Footer...');

  for (const [idStr, cdata] of Object.entries(CAMPAIGNS)) {
    const id = parseInt(idStr);
    const html = wrapHtml(cdata.body, cdata.cta, cdata.ctaUrl, cdata.campaignName);

    try {
      console.log(`  Updating campaign ${id} (${cdata.niche})...`);
      await brevo.updateCampaign(id, { htmlContent: html });
      console.log(`  ✅ Campaign ${id} updated successfully with UTM parameters.`);
    } catch (e: any) {
      console.error(`  ❌ Failed to update campaign ${id}: ${e.message}`);
    }
  }

  console.log('\n🎉 Update complete. All scheduled campaigns are UTM-tracked!');
}

main().catch(console.error);
