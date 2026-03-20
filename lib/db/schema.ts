import { pgTable, serial, text, timestamp, boolean, integer, varchar, index } from 'drizzle-orm/pg-core';

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
  source: varchar('source', { length: 50 }).default('website'), // website, csv_upload, manual
  intentCategory: varchar('intent_category', { length: 50 }).default('GENERAL_EXPLORATION'),
  intentScore: integer('intent_score').default(0),
  urgency: varchar('urgency', { length: 20 }).default('LOW'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => {
  return {
    emailIdx: index('leads_email_idx').on(table.email),
    createdAtIdx: index('leads_created_at_idx').on(table.createdAt)
  };
});

// ─── Senders ─────────────────────────────────────────────────
export const senders = pgTable('senders', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(), // Must be verified in Brevo
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Campaigns ───────────────────────────────────────────────
export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  subject: varchar('subject', { length: 500 }).notNull(),
  content: text('content').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // draft, sent
  segment: varchar('segment', { length: 50 }).notNull().default('all'),
  template: varchar('template', { length: 50 }).notNull().default('standard'), // standard, liquid_glass
  senderId: integer('sender_id'), // Optional, defaults to env var if null
  stats: text('stats').notNull().default('{"sent":0,"opened":0,"clicked":0}'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Social Content Drafts ─────────────────────────────────────
export const socialDrafts = pgTable('social_drafts', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id, { onDelete: 'cascade' }).notNull(),
  content: text('content').notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, approved, scheduled, posted
  scheduledFor: timestamp('scheduled_for'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => {
  return {
    postIdIdx: index('social_drafts_post_id_idx').on(table.postId)
  };
});

// ─── Type Exports ─────────────────────────────────────────────
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type Campaign = typeof campaigns.$inferSelect;
export type NewCampaign = typeof campaigns.$inferInsert;
export type Sender = typeof senders.$inferSelect;
export type NewSender = typeof senders.$inferInsert;
export type SocialDraft = typeof socialDrafts.$inferSelect;
export type NewSocialDraft = typeof socialDrafts.$inferInsert;
