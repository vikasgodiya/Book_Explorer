const mongoose = require("mongoose");

async function test() {
  try {
    await mongoose.connect("mongodb+srv://vikasuser:viki%409003@cluster0.cib1g9x.mongodb.net/book_explorer?retryWrites=true&w=majority&appName=Cluster0");
    console.log("✅ Connected to MongoDB!");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

test();
