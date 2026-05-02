import { getDb } from "../src/lib/db";
import { users } from "../src/lib/db/schema";

const ALLOWED_EMAILS = ["hoanganh.luong2906@gmail.com"];

async function seed() {
  const db = getDb();
  for (const email of ALLOWED_EMAILS) {
    await db.insert(users).values({ email }).onConflictDoNothing();
    console.log(`Seeded: ${email}`);
  }
  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
