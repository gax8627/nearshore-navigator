// Backlink outreach emails sent via Brevo under Denisse Martinez
const BREVO_API_KEY = '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';

const sender = { email: 'nearshore.navigator@gmail.com', name: 'Denisse Martinez' };
const replyTo = { email: 'denisse@nearshorenavigator.com', name: 'Denisse Martinez' };

const emails = [
  {
    to: [{ email: 'klaughlin@nearshoreamericas.com', name: 'Kirk Laughlin' }],
    cc: [{ email: 'cesar@nextcoastmedia.com', name: 'César Cantú' }],
    subject: 'Contributed Article Pitch: City-by-City Mexico Labor Cost Data — Hermosillo, Bajío, and the 2026 Nearshoring Map',
    textContent: `Hi Kirk,

I'm Denisse Martinez, Partner at Nearshore Navigator (nearshorenavigator.com) — a location advisory platform that helps US manufacturers evaluate and select contract manufacturing and shelter service partners across Mexico.

We've been building a city-level data set of fully burdened labor costs, industrial park lease rates, and border crossing performance across 15+ Mexican manufacturing cities that I think would make a strong contributed article for your audience. Some highlights from our 2026 data:

• Silao / Guanajuato: $4.80–$5.80/hr — lowest in Mexico, anchored by the GM Silverado plant and Puerto Interior de Guanajuato (Mexico's only inland dry port)
• Hermosillo: $5.27/hr with shelter services — dramatically underreported outside the Ford/aerospace community
• Monterrey: $6.50–$8.00/hr but with the deepest Tier 1 supplier ecosystem after Tesla's Gigafactory ramp-up
• Tijuana: $7.84/hr border zone, still the dominant US West Coast gateway despite Section 301 shifting demand toward interior cities

The article I'd propose: "Beyond Tijuana: The 2026 City-by-City Guide to Mexico Manufacturing Costs and Industrial Clusters" — with data tables, city comparisons, and analysis of which cities are best suited for which manufacturing profiles (high-volume vs. aerospace-grade vs. medical device).

Our platform is compensated by US manufacturer clients, not by industrial parks or shelter operators, so the data is genuinely independent and decision-useful.

Would you be open to a contributed piece, a data partnership, or a short interview? Happy to share our full city comparison data set as a starting point.

Warm regards,
Denisse Martinez
Partner, Nearshore Navigator
denisse@nearshorenavigator.com
nearshorenavigator.com
`,
  },
  {
    to: [{ email: 'editorial@mexicobusiness.news', name: 'Mexico Business News Editorial' }],
    subject: 'Expert Contributor Submission: "The 2026 Mexico Manufacturing Cost Map — Beyond the Border Cities"',
    textContent: `Hello Mexico Business News Editorial Team,

I found your Expert Contributor program (mexicobusiness.news/expert-contributor) and wanted to reach out about submitting an article.

I'm Denisse Martinez, Partner at Nearshore Navigator — an independent location advisory platform for US manufacturers evaluating Mexico. We help companies choose between contract manufacturing and shelter service partners across 15+ cities, and we are compensated by client manufacturers rather than industrial parks or shelter operators, which keeps our data genuinely independent.

Proposed article: "The 2026 Mexico Manufacturing Cost Map: Silao vs. Hermosillo vs. Monterrey — Which City Fits Your Operation?"

Key data points we would include:
• Fully burdened labor rates by city (Silao: $4.80–$5.80/hr; Hermosillo: $5.27/hr; Monterrey: $6.50–$8/hr; border cities: $7.84/hr)
• Industrial park lease rates by market ($0.55–$0.70/SF NNN in Querétaro aerospace parks vs. $0.75–$0.85 in Tijuana)
• Which cities are winning the EV and Tesla supply chain buildout (Nuevo León)
• Which cities are winning the Boeing and aerospace nearshoring wave (Querétaro, Mexicali, Nogales)
• Border crossing performance data affecting JIT logistics decisions

The angle: most coverage focuses on Tijuana and Monterrey. The real story in 2026 is diversification — Hermosillo's shelter services emergence, Silao's GM ecosystem, and Querétaro's aerospace certification depth.

I would be happy to tailor the article to your editorial guidelines. Approximate length: 800–1,200 words with a data table.

Warm regards,
Denisse Martinez
Partner, Nearshore Navigator
denisse@nearshorenavigator.com
nearshorenavigator.com
`,
  },
  {
    to: [{ email: 'press@globaltrademag.com', name: 'Global Trade Magazine' }],
    subject: 'Data Pitch: 2026 Mexico Nearshoring Cost Data — Contributed Article or Data Feature',
    textContent: `Hello Global Trade Magazine Editorial Team,

I'm Denisse Martinez, Partner at Nearshore Navigator (nearshorenavigator.com), a platform that tracks labor costs, industrial real estate rates, and border logistics performance across Mexico's 15+ manufacturing cities.

Given your recent coverage of Mexico nearshoring trends, I wanted to pitch a data-driven follow-up that goes deeper than the macro story.

Article concept: "The 2026 Mexico Manufacturing Location Matrix: Which City, Which Service, Which Cost"

What makes this different from standard nearshoring coverage:
• We track fully burdened labor costs (not just minimum wage) — including IMSS, INFONAVIT, Aguinaldo, and PTU
• We segment by operation type: contract manufacturing vs. shelter services vs. distribution centers
• We have border crossing performance data (FAST-lane clearance times by port of entry)
• We cover cities other publications overlook: Silao's inland dry port advantage, Hermosillo's shelter market, Matamoros's SpaceX/aerospace corridor

Happy to contribute a bylined article or provide data for a staff-written feature. Nearshore Navigator has no sponsored content relationships with manufacturers or industrial parks — our data is independent.

Warm regards,
Denisse Martinez
Partner, Nearshore Navigator
denisse@nearshorenavigator.com
nearshorenavigator.com
`,
  },
];

async function sendEmail(email) {
  const payload = {
    sender,
    replyTo,
    to: email.to,
    ...(email.cc ? { cc: email.cc } : {}),
    subject: email.subject,
    textContent: email.textContent,
  };

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (res.ok) {
    console.log(`✅ Sent to ${email.to[0].email} — messageId: ${data.messageId}`);
  } else {
    console.error(`❌ Failed to ${email.to[0].email}:`, JSON.stringify(data));
  }
}

for (const email of emails) {
  await sendEmail(email);
}
