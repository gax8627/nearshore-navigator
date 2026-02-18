import { pgTable, serial, text, timestamp, boolean, integer, varchar } from 'drizzle-orm/pg-core';

// ─── Blog Posts ───────────────────────────────────────────────
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  excerpt: text('excerpt').notNull().default(''),
  content: text('content').notNull().default(''),
  category: varchar('category', { length: 100 }).notNull().default('General'),
  imageUrl: text('image_url').notNull().default(''),
  tags: text('tags').notNull().default('[]'), // JSON array stored as text
  readTime: varchar('read_time', { length: 20 }).notNull().default('5 min read'),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ─── Leads (from Contact Form) ───────────────────────────────
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  company: varchar('company', { length: 255 }).notNull().default(''),
  phone: varchar('phone', { length: 50 }).default(''),
  message: text('message').notNull().default(''),
  status: varchar('status', { length: 50 }).notNull().default('new'), // new, contacted, meeting_booked, closed
  score: integer('score').default(0),
  category: varchar('category', { length: 50 }).default('Standard'), // High, Standard, Low
  tags: text('tags').notNull().default('[]'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Type Exports ─────────────────────────────────────────────
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
