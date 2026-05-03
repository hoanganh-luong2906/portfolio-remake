import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ContentStatus = "draft" | "published" | "archived";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  category: text("category").notNull().default("Engineering"),
  tags: text("tags").array().notNull().default([]),
  cover: text("cover").notNull().default("gradient-mesh"),
  body: text("body").notNull().default(""),
  status: text("status").$type<ContentStatus>().notNull().default("draft"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type Metric = { value: string; label: string };

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  year: text("year").notNull().default(""),
  role: text("role").notNull().default(""),
  company: text("company").notNull().default(""),
  art: text("art").notNull().default("loom"),
  tone: text("tone").notNull().default("lime"),
  stack: text("stack").array().notNull().default([]),
  summary: text("summary").notNull().default(""),
  metrics: jsonb("metrics").$type<Metric[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  status: text("status").$type<ContentStatus>().notNull().default("draft"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  year: text("year").notNull().default(""),
  role: text("role").notNull(),
  company: text("company").notNull(),
  note: text("note").notNull().default(""),
  current: boolean("current").notNull().default(false),
  status: text("status").$type<ContentStatus>().notNull().default("published"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
