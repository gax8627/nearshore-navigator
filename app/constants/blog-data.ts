export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  imageUrl: string;
  tags: string[];
  content?: string; // HTML content or markdown
};

export const BLOG_POSTS: BlogPost[] = [
  {
      title: "Nearshoring in Baja California: A Guide for US Companies",
      excerpt: "Everything you need to know about setting up operations in Mexico's manufacturing hub.",
      date: "Oct 24, 2025",
      slug: "nearshoring-in-tijuana-guide-for-us-companies",
      imageUrl: "/images/warehouse.jpg",
      tags: ["Guide", "Strategy"],
      content: `
        <p>Baja California has arguably become the most critical manufacturing hub in North America for companies looking to decouple from Asia. With its strategic proximity to California, a shared time zone, and a deeply integrated cross-border culture, it offers advantages that few other regions can match.</p>
        <h2>Why Baja California?</h2>
        <p>The region is home to established clusters in Medical Devices, Aerospace, and Electronics. Major players like Medtronic, Honeywell, and Samsung have massive operations here.</p>
        <h2>The Workforce Advantage</h2>
        <p>With a young, technical workforce and numerous universities producing thousands of engineers annually, Baja California provides the human capital necessary for complex manufacturing.</p>
      `
  },
  {
      title: "Baja California vs Asia: Manufacturing Cost Comparison",
      excerpt: "Analyze the total landed cost benefits of manufacturing in Baja California versus traditional Asian hubs.",
      date: "Nov 12, 2025",
      slug: "tijuana-vs-asia-manufacturing-cost-comparison",
      imageUrl: "/images/factory-worker.jpg",
      tags: ["Cost Analysis", "Economics"],
      content: `
        <p>When calculating Total Landed Cost (TLC), Mexico often wins out over Asian competitors due to lower logistics costs, zero tariffs under USMCA, and faster lead times.</p>
        <h2>Logistics Savings</h2>
        <p>Container shipping from China has become unpredictable and expensive. Trucking from Tijuana to Los Angeles takes mere hours.</p>
      `
  },
  {
      title: "How Shelter Services Work in Baja California",
      excerpt: "Understanding the shelter model: the fastest, lowest-risk way to start manufacturing in Mexico.",
      date: "Dec 05, 2025",
      slug: "how-shelter-services-work-in-tijuana",
      imageUrl: "/images/consulting.jpg",
      tags: ["Shelter", "Legal"],
      content: `
        <p>A Shelter Service Provider acts as your legal entity in Mexico, handling all administrative burdens while you focus on production. This allows you to start operations in as little as 90 days.</p>
        <h2>Key Benefits</h2>
        <ul>
          <li>Faster startup time</li>
          <li>Reduced liability</li>
          <li>Immediate VAT certification</li>
        </ul>
      `
  },
  {
      title: "Industrial Parks Map Overview 2026",
      excerpt: "A deep dive into the top industrial zones: Otay, El Florido, and Pacifico.",
      date: "Jan 10, 2026",
      slug: "industrial-parks-in-tijuana-map-and-overview",
      imageUrl: "https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80&w=800",
      tags: ["Real Estate", "Maps"],
      content: `
        <p>Tijuana has over 70 industrial parks. Choosing the right one depends on your labor needs, logistics requirements, and budget.</p>
        <h2>Otay Mesa</h2>
        <p>Adjacent to the border crossing, ideal for high-volume logistics.</p>
        <h2>El Florido</h2>
        <p>Large land reserves, home to massive campuses for Samsung and Coca-Cola.</p>
      `
  }
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}
