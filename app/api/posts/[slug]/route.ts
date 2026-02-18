import { NextRequest, NextResponse } from 'next/server';
import { getPostBySlug, type BlogPost } from '@/app/constants/blog-data';

function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

function formatFallback(p: BlogPost) {
  return {
    id: 0,
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
  };
}

// GET /api/posts/:slug — Public: get a single published post (no auth)
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  try {
    if (!isDbConfigured()) {
      const fallbackPost = getPostBySlug(slug);
      if (!fallbackPost) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post: formatFallback(fallbackPost) });
    }

    const { db } = await import('@/lib/db');
    const { posts } = await import('@/lib/db/schema');
    const { eq, and } = await import('drizzle-orm');

    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.published, true)))
      .limit(1);

    if (!post) {
      // Try fallback
      const fallbackPost = getPostBySlug(slug);
      if (fallbackPost) {
        return NextResponse.json({ post: formatFallback(fallbackPost) });
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    const fallbackPost = getPostBySlug(slug);
    if (fallbackPost) {
      return NextResponse.json({ post: formatFallback(fallbackPost) });
    }
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
}
