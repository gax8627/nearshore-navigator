import { brevo } from '../lib/brevo';
import fs from 'fs';
import path from 'path';

async function setup() {
  console.log('Starting Brevo Setup...');

  try {
    // 1. Create Attributes
    console.log('Creating attributes...');
    await brevo.createAttribute('normal', 'ORGANIZATION', 'text');
    await brevo.createAttribute('normal', 'HOOK', 'text');
    await brevo.createAttribute('normal', 'ARTICLE_TITLE', 'text');
    await brevo.createAttribute('normal', 'COMPANY', 'text');
    await brevo.createAttribute('normal', 'LOCATION', 'text');
    await brevo.createAttribute('normal', 'PROJECT_REFERENCE', 'text');
    await brevo.createAttribute('normal', 'PUBLICATION', 'text');
    await brevo.createAttribute('normal', 'PITCH_ANGLE', 'text');
    await brevo.createAttribute('normal', 'ARTICLE_ABSTRACT', 'text');
    await brevo.createAttribute('normal', 'LANGUAGE', 'text');
    await brevo.createAttribute('normal', 'SUBJECT_LINE', 'text');

    // 2. Create Lists
    console.log('Creating lists...');
    const list1 = await brevo.createList('Industry Associations EN');
    const list3 = await brevo.createList('Media Prospects EN');

    console.log('Lists created:', { list1, list3 });

    // 3. Define HTML Base Style (Matching Site)
    const baseStyle = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Outfit:wght@600&display=swap');
        body { font-family: 'Inter', sans-serif; color: #1e293b; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { margin-bottom: 24px; }
        .content { margin-bottom: 32px; }
        .footer { font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        .btn { background-color: #0F9D58; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; }
        .logo { font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 600; color: #0F9D58; text-decoration: none; }
      </style>
    `;

    // 4. Create Templates
    console.log('Creating templates...');
    
    // Template 1: Association Outreach
    const t1 = await brevo.createTemplate({
      name: 'Association Outreach (EN)',
      subject: 'Collaborating on Baja California\'s 2026 Growth Data',
      htmlContent: `
        <html>
          <head>${baseStyle}</head>
          <body>
            <div class="container">
              <div class="header">
                <a href="https://nearshorenavigator.com" class="logo">Nearshore Navigator</a>
              </div>
              <div class="content">
                <p>Hi {{contact.FIRSTNAME}},</p>
                <p>I closely follow {{contact.ORGANIZATION}}'s updates on Baja California's industrial growth—{{contact.HOOK}} was excellent to see.</p>
                <p>As the Marketing Director at Nearshore Navigator, we're currently publishing our "2026 Ultimate Guide to Baja Shelter Services." Because we rely so heavily on the foundational data your organization provides, we'd love to feature and link out to you as a recommended resource for US firms.</p>
                <p>Would you be open to a quick chat to ensure we're aligning our data? In return, we'd love to discuss contributing a guest insight piece regarding upcoming USMCA compliance trends.</p>
                <p style="margin-top: 30px;">
                  <a href="https://nearshorenavigator.com/en/insights/ultimate-guide-baja-shelter" class="btn">View the Guide</a>
                </p>
              </div>
              <div class="footer">
                <p><strong>Denisse Martinez</strong><br/>Marketing Director, Nearshore Navigator</p>
                <p>denisse@nearshorenavigator.com | Tijuana, BC</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    // Template 3: Media Pitch
    const t3 = await brevo.createTemplate({
      name: 'Media Pitch (EN)',
      subject: '{{contact.SUBJECT_LINE}}',
      htmlContent: `
        <html>
          <head>${baseStyle}</head>
          <body>
            <div class="container">
              <div class="content">
                <p>Hi {{contact.FIRSTNAME}},</p>
                <p>{{contact.PUBLICATION}} has done an excellent job lately covering the shifting sands of nearshoring. {{contact.PITCH_ANGLE}}</p>
                <p>I'm the Marketing Director at Nearshore Navigator in Tijuana. {{contact.ARTICLE_ABSTRACT}}</p>
                <p>I can have a draft over by next week—does this align with your upcoming editorial calendar?</p>
              </div>
              <div class="footer">
                <p>Best,<br/><strong>Denisse Martinez</strong><br/>Marketing Director, Nearshore Navigator</p>
                <p>denisse@nearshorenavigator.com</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    console.log('Templates created:', { t1, t3 });

    // 5. Add Contacts to Lists
    console.log('Adding contacts...');
    
    // Associations
    const assocs = [
      { email: 'info@tijuanaedc.org', attributes: { FIRSTNAME: 'Contact', ORGANIZATION: 'Tijuana EDC', HOOK: 'your recent launch of the "Semiconductor Ecosystem Development Mexico for Growth 2026" initiative', LANGUAGE: 'EN' } },
      { email: 'contacto@canacintratijuana.org.mx', attributes: { FIRSTNAME: 'Contact', ORGANIZATION: 'CANACINTRA Tijuana', HOOK: 'your recent establishment of the "Strategic Councils for 2026" focused on medical devices', LANGUAGE: 'EN' } },
      { email: 'bc@index.org.mx', attributes: { FIRSTNAME: 'Contact', ORGANIZATION: 'INDEX Maquiladora', HOOK: 'the regional training you are leading for the "2026 Fiscal Reform"', LANGUAGE: 'EN' } },
      { email: 'secretaria@bajacalifornia.gob.mx', attributes: { FIRSTNAME: 'Contact', ORGANIZATION: 'Baja California SEI', HOOK: 'the recent announcement of the "2026 State Financing Program for Innovation"', LANGUAGE: 'EN' } },
      { email: 'info@sandiegobusiness.org', attributes: { FIRSTNAME: 'Contact', ORGANIZATION: 'San Diego Regional EDC', HOOK: 'your development of the "2026 Binational Strategic Agenda"', LANGUAGE: 'EN' } }
    ];

    for (const assoc of assocs) {
      await brevo.createContact({ ...assoc, listIds: [list1.id] });
    }

    // Media
    const media = [
      { email: 'editor@supplychaindive.com', attributes: { FIRSTNAME: 'Editor', PUBLICATION: 'Supply Chain Dive', SUBJECT_LINE: 'Surviving the 2026 USMCA Rules of Origin via Shelter Operations', PITCH_ANGLE: 'As the 2026 USMCA Rules of Origin thresholds drastically tighten, many manufacturers are hitting a wall.', ARTICLE_ABSTRACT: 'We are seeing a surge in managed Shelter Agreements specifically to outsource the extreme regulatory burn of the 2026 standards.', LANGUAGE: 'EN' } },
      { email: 'editor@industryweek.com', attributes: { FIRSTNAME: 'Editor', PUBLICATION: 'IndustryWeek', SUBJECT_LINE: 'Why the \'China Plus One\' Strategy Fractures at the Border', PITCH_ANGLE: 'The reality on the ground in Mexico is that 4 out of 10 US manufacturers are facing costly delays.', ARTICLE_ABSTRACT: 'We\'ve identified that "China Plus One" repeatedly fails unless executives utilize a Managed Shelter Agreement to offload compliance.', LANGUAGE: 'EN' } }
    ];

    for (const m of media) {
      await brevo.createContact({ ...m, listIds: [list3.id] });
    }

    // 6. Create Campaigns (Drafts)
    console.log('Creating campaigns...');
    
    await brevo.createCampaign({
      name: 'Association Outreach March 2026',
      templateId: t1.id,
      subject: 'Collaborating on Baja California\'s 2026 Growth Data',
      listIds: [list1.id]
    });

    await brevo.createCampaign({
      name: 'Media Pitches March 2026',
      templateId: t3.id,
      subject: 'Nearshore Navigator Media Pitch',
      listIds: [list3.id]
    });

    console.log('Setup Complete!');

  } catch (error) {
    console.error('Setup Failed:', error);
  }
}

setup();
