import "dotenv/config";
import { connectToDatabase } from "@/database/mongoose";

async function testConnection() {
  console.log("🔄 Testing database connection...\n");

  try {
    const connection = await connectToDatabase();

    console.log("✅ Connection successful!");
    console.log("📊 Connection state:", connection.connection.readyState);
    console.log("🗄️  Database name:", connection.connection.name);
    console.log("🌐 Host:", connection.connection.host);

    // Close the connection
    await connection.connection.close();
    console.log("\n🔌 Connection closed successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed!");
    console.error("Error details:", error);
    process.exit(1);
  }
}

testConnection();
