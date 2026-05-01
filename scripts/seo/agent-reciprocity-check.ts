/**
 * Hreflang Reciprocity Agent
 * 
 * Automates the validation of hreflang tags across our localized pages.
 * Ensures that if Page A points to Page B as an alternate language,
 * Page B must point back to Page A. Also verifies that alternate pages
 * return a 200 OK status.
 * 
 * Usage: npx tsx scripts/seo/agent-reciprocity-check.ts <url>
 */

async function fetchHtml(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ ERROR: Failed to fetch ${url} (Status: ${res.status})`);
      return null;
    }
    return await res.text();
  } catch (error) {
    console.error(`❌ ERROR: Network error fetching ${url}`, error);
    return null;
  }
}

function extractHreflangs(html: string): { lang: string; href: string }[] {
  const hreflangs: { lang: string; href: string }[] = [];
  // Basic regex to parse <link rel="alternate" hreflang="xx" href="url" />
  // This handles variations in attribute ordering.
  const regex = /<link[^>]+rel=["']alternate["'][^>]*>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const langMatch = tag.match(/hreflang=["']([^"']+)["']/i);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);

    if (langMatch && hrefMatch) {
      hreflangs.push({
        lang: langMatch[1],
        href: hrefMatch[1],
      });
    }
  }

  return hreflangs;
}

async function auditUrl(targetUrl: string) {
  console.log(`\n🔍 Starting Hreflang Reciprocity Audit for: ${targetUrl}`);
  console.log(`------------------------------------------------------`);

  const sourceHtml = await fetchHtml(targetUrl);
  if (!sourceHtml) {
    console.log(`❌ Aborting audit due to fetch failure.`);
    return;
  }

  const sourceHreflangs = extractHreflangs(sourceHtml);
  
  if (sourceHreflangs.length === 0) {
    console.log(`⚠️ No hreflang tags found on source page.`);
    return;
  }

  console.log(`✅ Found ${sourceHreflangs.length} hreflang declarations on source page:`);
  sourceHreflangs.forEach(h => console.log(`   - [${h.lang}] -> ${h.href}`));

  let errors = 0;

  for (const targetLang of sourceHreflangs) {
    console.log(`\n🔄 Auditing alternate: [${targetLang.lang}] ${targetLang.href}`);
    
    // Check if it's self-referencing
    if (targetLang.href === targetUrl) {
      console.log(`   ✅ PASS: Self-referencing tag is valid.`);
      continue;
    }

    const alternateHtml = await fetchHtml(targetLang.href);
    if (!alternateHtml) {
      errors++;
      continue;
    }

    const alternateHreflangs = extractHreflangs(alternateHtml);
    
    // Check for return tag
    const returnTag = alternateHreflangs.find(h => h.href === targetUrl);

    if (returnTag) {
      console.log(`   ✅ PASS: Reciprocal tag found on alternate page ([${returnTag.lang}] -> ${returnTag.href})`);
    } else {
      console.log(`   ❌ FAIL: Missing reciprocal tag! Alternate page does not link back to source.`);
      errors++;
    }
  }

  console.log(`\n======================================================`);
  if (errors === 0) {
    console.log(`🎉 AUDIT PASSED: Perfect hreflang reciprocity verified.`);
  } else {
    console.log(`🚨 AUDIT FAILED: Found ${errors} reciprocity/fetch errors. See logs above.`);
  }
  console.log(`======================================================\n`);
}

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error("Usage: npx tsx scripts/seo/agent-reciprocity-check.ts <url>");
    process.exit(1);
  }

  await auditUrl(url);
}

main();
