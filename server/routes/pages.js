const express = require('express');
const router = express.Router();
const Page = require('../models/Page');
const { authMiddleware } = require('./auth');

// GET all pages for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const pages = await Page.find({ user: req.userId });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new page
router.post('/', authMiddleware, async (req, res) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    drawing: req.body.drawing,
    user: req.userId
  });

  try {
    const newPage = await page.save();
    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a page
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedPage = await Page.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updatedPage) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json(updatedPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a page
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const page = await Page.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
