import { connectToDatabase } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await connectToDatabase();

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      details: {
        readyState: connection.connection.readyState,
        dbName: connection.connection.name,
        host: connection.connection.host,
        readyStateDescription: getReadyStateDescription(
          connection.connection.readyState,
        ),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

function getReadyStateDescription(state: number): string {
  const states: Record<number, string> = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };
  return states[state] || "Unknown";
}
