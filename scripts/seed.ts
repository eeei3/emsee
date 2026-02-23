import "dotenv/config";
import db from "../db";
import { clubs, events } from "../db/schema";

const seedClubs = [
	{ name: "Computer Science Club", email: "cs.club@utsc.ca" },
	{ name: "Debate Society", email: "debate@utsc.ca" },
	{ name: "Photography Club", email: "photo.club@utsc.ca" },
	{ name: "Robotics Team", email: "robotics@utsc.ca" },
	{ name: "Environmental Alliance", email: "green@utsc.ca" },
];

async function seed() {
	console.log("Seeding database...");

	for (const club of seedClubs) {
		await db
			.insert(clubs)
			.values(club)
			.onConflictDoNothing({ target: clubs.email });
	}

	const seedEvents = [
		{
			name: "Annual Hackathon",
			description: "24-hour coding competition with prizes",
			date: "2026-03-15",
			location: "IC 200",
			budget: 50000, // $500.00 in cents
			clubId: 1,
		},
		{
			name: "Photography Walk",
			description: "Campus golden hour photography session",
			date: "2026-03-20",
			location: "The Valley",
			budget: 5000, // $50.00 in cents
			clubId: 3,
		},
	];

	for (const event of seedEvents) {
		await db.insert(events).values(event).onConflictDoNothing();
	}

	console.log("Seeding complete.");
	process.exit(0);
}

seed().catch(err => {
	console.error("Seeding failed:", err);
	process.exit(1);
});
