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

const seedEvents = [
    { event_name: "fun party", desc: "I promise it's fun", loc: "IA 2060", time: new Date("2011-10-10T14:48:00"), cost: 0.0, max_att: 5, curr_att: 5},
    { event_name: "not fun party", desc: "It can't get worse", loc: "Nowhere", time: new Date("2096-10-10T22:00:00"), cost: 10.99, max_att: 0, curr_att: 5},
    { event_name: "Welcome Party", desc: "You showed up", loc: "3325 Ellesmere Road", time: new Date("2026-05-10T08:48:00"), cost: 0.00, max_att: 20, curr_att: 15},
];

async function seed() {
	console.log("Seeding database...");

	for (const club of seedClubs) {
		await db
			.insert(clubs)
			.values(club)
			.onConflictDoNothing({ target: clubs.email });
	}

  for (const event of seedEvents) {
    await db
      .insert(events)
      .values(event); 
    }

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch(err => {
	console.error("Seeding failed:", err);
	process.exit(1);
});
