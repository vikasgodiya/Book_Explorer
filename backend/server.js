const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const createBookModel = require('../models/book');
const Book = createBookModel(mongoose);


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));


mongoose.set('strictQuery', false);

app.get('/api/books', async (req, res) => {
  try {
    // extract "page" and "limit" from query string (default: page=1, limit=10)
    const { page = 1, limit = 10 } = req.query;

    // fetch paginated results
    const books = await Book.find()
      .skip((page - 1) * limit)   // skip docs from previous pages
      .limit(Number(limit));      // limit results to "limit"

    // count total docs (to calculate total pages)
    const totalBooks = await Book.countDocuments();
    const totalPages = Math.ceil(totalBooks / limit);

    res.json({
      page: Number(page),
      totalPages,
      totalBooks,
      books
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


async function startServer() {
  try {
    await mongoose.connect(
       "mongodb+srv://vikasuser:viki%409003@cluster0.cib1g9x.mongodb.net/book_explorer?retryWrites=true&w=majority&appName=Cluster0",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log("✅ MongoDB connected!");
    app.listen(5000, () => console.log("🚀 Server on http://localhost:5000"));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

startServer();
