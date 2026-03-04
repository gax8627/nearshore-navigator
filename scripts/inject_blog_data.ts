import fs from 'fs';
import path from 'path';

function parseMdx(filePath: string) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) throw new Error("Could not parse frontmatter in " + filePath);
    
    const frontmatterRaw = match[1];
    const body = match[2];

    const titleMatch = frontmatterRaw.match(/title:\s*"([^"]+)"/);
    const excerptMatch = frontmatterRaw.match(/excerpt:\s*"([^"]+)"/);
    const dateMatch = frontmatterRaw.match(/date:\s*"([^"]+)"/);
    const imageMatch = frontmatterRaw.match(/imageUrl:\s*"([^"]+)"/);
    
    return {
        title: titleMatch ? titleMatch[1] : "",
        excerpt: excerptMatch ? excerptMatch[1] : "",
        date: dateMatch ? dateMatch[1] : "",
        imageUrl: imageMatch ? imageMatch[1] : "",
        content: body,
        slug: path.basename(filePath, '.mdx')
    };
}

const articles = [
    parseMdx('./content/insights/maquiladora-vs-shelter-services-mexico.mdx'),
    parseMdx('./content/insights/china-plus-one-strategy-mexico.mdx'),
    parseMdx('./content/insights/medical-device-manufacturing-tijuana.mdx'),
    parseMdx('./content/insights/aerospace-manufacturing-queretaro-mexico.mdx')
];

const zhChina = parseMdx('./content/insights/zh/china-plus-one-strategy-mexico.mdx');
const koChina = parseMdx('./content/insights/ko/china-plus-one-strategy-mexico.mdx');

let newObjectsStr = "";

for (const a of articles) {
    // Determine tags
    let tags = '["Insights"]';
    if (a.slug.includes('maquiladora')) tags = '["Nearshoring", "Strategy", "Mexico Manufacturing"]';
    if (a.slug.includes('china')) tags = '["China Plus One", "Nearshoring", "Supply Chain", "Mexico Manufacturing"]';
    if (a.slug.includes('medical')) tags = '["Medical Devices", "Tijuana", "FDA Manufacturing", "Nearshoring"]';
    if (a.slug.includes('aerospace')) tags = '["Aerospace", "Querétaro", "Advanced Manufacturing", "Nearshoring"]';

    let localesStr = "";
    if (a.slug === 'china-plus-one-strategy-mexico') {
        localesStr = `,
      locales: {
        zh: {
            title: ${JSON.stringify(zhChina.title)},
            excerpt: ${JSON.stringify(zhChina.excerpt)},
            tags: ${tags},
            content: \`${zhChina.content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`
        },
        ko: {
            title: ${JSON.stringify(koChina.title)},
            excerpt: ${JSON.stringify(koChina.excerpt)},
            tags: ${tags},
            content: \`${koChina.content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`
        }
      }`;
    }

    // Format date for display
    const dateObj = new Date(a.date);
    const displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    let postStr = `  {
      title: ${JSON.stringify(a.title)},
      excerpt: ${JSON.stringify(a.excerpt)},
      date: "${displayDate}",
      slug: "${a.slug}",
      imageUrl: "${a.imageUrl}",
      tags: ${tags},
      content: \`${a.content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`${localesStr}
  },
`;
    newObjectsStr += postStr;
}

const blogDataPath = './app/constants/blog-data.ts';
let blogData = fs.readFileSync(blogDataPath, 'utf-8');

// Find the end of the BLOG_POSTS array marked by "];\n\nexport function getAllPosts()"
const insertionPoint = blogData.lastIndexOf('];');

if (insertionPoint !== -1) {
    blogData = blogData.substring(0, insertionPoint) + ',\n' + newObjectsStr + blogData.substring(insertionPoint);
    fs.writeFileSync(blogDataPath, blogData);
    console.log("Successfully injected 4 AI articles into blog-data.ts");
} else {
    console.error("Could not find insertion point in blog-data.ts");
}
