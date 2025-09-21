module.exports = (mongoose) => {
  const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: String, required: true },
    rating: { type: String, required: true },
    detailUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true }
  }, { timestamps: true });

  return mongoose.model('Book', bookSchema);
};
