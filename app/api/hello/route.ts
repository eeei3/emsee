import { NextResponse } from "next/server";
import db from "@/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.execute(sql`SELECT 1 as connected`);
    return NextResponse.json({ status: "ok", result: result.rows });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    );
  }
}
