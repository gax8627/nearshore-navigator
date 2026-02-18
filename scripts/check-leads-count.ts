import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { count } from "drizzle-orm";

async function main() {
  const result = await db.select({ count: count() }).from(leads);
  console.log("Total Leads in DB:", result[0].count);
  process.exit(0);
}

main();
