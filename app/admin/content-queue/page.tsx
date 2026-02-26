import React from 'react';
import { db } from '@/lib/db';
import { socialDrafts, posts } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import ContentQueueClient from './ContentQueueClient';

export const dynamic = 'force-dynamic';

export default async function ContentQueuePage() {
  // Fetch real drafts from the database, joining with posts for the title
  const drafts = await db
    .select({
      id: socialDrafts.id,
      postId: socialDrafts.postId,
      content: socialDrafts.content,
      status: socialDrafts.status,
      createdAt: socialDrafts.createdAt,
      postTitle: posts.title,
    })
    .from(socialDrafts)
    .leftJoin(posts, eq(socialDrafts.postId, posts.id))
    .orderBy(desc(socialDrafts.createdAt));

  // Format the data for the client component
  const formattedDrafts = drafts.map(draft => ({
    id: draft.id,
    postTitle: draft.postTitle || 'Unknown Post',
    content: draft.content,
    status: draft.status,
    generatedAt: new Date(draft.createdAt).toLocaleDateString(),
  }));

  return <ContentQueueClient initialDrafts={formattedDrafts} />;
}
