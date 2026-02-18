import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

// Helper: Check if DB is configured
function isDbConfigured() {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING);
}

// GET /api/admin/posts — List all posts
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Database not configured', posts: [] }, { status: 200 });
    }

    const { db } = await import('@/lib/db');
    const { posts } = await import('@/lib/db/schema');
    const { desc } = await import('drizzle-orm');

    const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
    return NextResponse.json({ posts: allPosts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts', posts: [] }, { status: 500 });
  }
}

// POST /api/admin/posts — Create a new post
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!isDbConfigured()) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const body = await req.json();
    const { title, slug, excerpt, content, category, imageUrl, tags, readTime, published } = body;

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 });
    }

    const { db } = await import('@/lib/db');
    const { posts } = await import('@/lib/db/schema');

    const [newPost] = await db.insert(posts).values({
      title,
      slug,
      excerpt: excerpt || '',
      content: content || '',
      category: category || 'General',
      imageUrl: imageUrl || '',
      tags: tags || '[]',
      readTime: readTime || '5 min read',
      published: published || false,
    }).returning();

    return NextResponse.json({ post: newPost }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    if (error?.code === '23505') {
      return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
