import {
	pgTable,
	serial,
	text,
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
	location: text("location"),
	budget: integer("budget"), // price in cents to avoid floating point issues
	createdAt: timestamp("created_at").defaultNow().notNull(),
	event_time: timestamp("event_time"),
	max_att: integer("max_attendees"),
	curr_att: integer("current_attendees"),
	cost: integer("admission_cost"),
});

