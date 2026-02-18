import { NextRequest, NextResponse } from 'next/server';
import { BLOG_POSTS } from '@/app/constants/blog-data';

function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

// GET /api/posts — Public: list published posts (no auth)
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  try {
    if (!isDbConfigured()) {
      // Fallback to hardcoded data
      const fallback = BLOG_POSTS.slice(0, limit).map((p, i) => ({
        id: i + 1,
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content || '',
        category: 'General',
        imageUrl: p.imageUrl,
        tags: JSON.stringify(p.tags),
        readTime: '5 min read',
        published: true,
        createdAt: p.date,
        updatedAt: p.date,
      }));
      return NextResponse.json({ posts: fallback });
    }

    const { db } = await import('@/lib/db');
    const { posts } = await import('@/lib/db/schema');
    const { desc, eq } = await import('drizzle-orm');

    const result = await db
      .select()
      .from(posts)
      .where(eq(posts.published, true))
      .orderBy(desc(posts.createdAt))
      .limit(limit);

    return NextResponse.json({ posts: result });
  } catch (error) {
    console.error('Error fetching public posts:', error);
    // Fallback on any DB error
    const fallback = BLOG_POSTS.slice(0, limit).map((p, i) => ({
      id: i + 1,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content || '',
      category: 'General',
      imageUrl: p.imageUrl,
      tags: JSON.stringify(p.tags),
      readTime: '5 min read',
      published: true,
      createdAt: p.date,
      updatedAt: p.date,
    }));
    return NextResponse.json({ posts: fallback });
  }
}
