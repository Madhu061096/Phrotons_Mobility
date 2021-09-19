const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    img: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
      },
    subTitle: String,
    description: String
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;