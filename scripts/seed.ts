import "dotenv/config";
import db from "../db";
import { clubs } from "../db/schema";

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

  console.log("Seeding complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
