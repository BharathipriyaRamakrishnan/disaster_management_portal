const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.post('/', upload.single('image'), async (req, res) => {
  const newBlog = new Blog({
    imageUrl: `/uploads/${req.file.filename}`,
    title: req.body.title,
    description: req.body.description,
  });
  await newBlog.save();
  res.status(201).json(newBlog);
});

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).send('Deleted successfully');
});

module.exports = router;
