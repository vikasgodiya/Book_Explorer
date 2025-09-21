mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected!');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});




const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Book = require('./models/book');

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://vikasuser:viki%409003@cluster0.cib1g9x.mongodb.net/book_explorer?retryWrites=true&w=majority&appName=Cluster0"

    );
    console.log("✅ Backend connected to MongoDB");

    // Routes
    app.get('/api/books', async (req, res) => {
      try {
        const { page = 1, limit = 10 } = req.query;
        const books = await Book.find()
          .skip((page - 1) * limit)
          .limit(Number(limit));
        res.json(books);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

startServer();
