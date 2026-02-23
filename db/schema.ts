import {
	pgTable,
	serial,
	text,
	date,
	integer,
	timestamp,
} from "drizzle-orm/pg-core";

export const clubs = pgTable("clubs", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
	id: serial("id").primaryKey(),
	clubId: integer("club_id")
		.notNull()
		.references(() => clubs.id), // foreign key to clubs
	name: text("name").notNull(),
	description: text("description"),
	date: date("date").notNull(),
	location: text("location"),
	budget: integer("budget"), // price in cents to avoid floating point issues
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
