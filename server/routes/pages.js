const express = require('express');
const router = express.Router();
const Page = require('../models/Page');

// GET all pages
router.get('/', async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new page
router.post('/', async (req, res) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const newPage = await page.save();
    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a page
router.put('/:id', async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a page
router.delete('/:id', async (req, res) => {
    try {
      const page = await Page.findByIdAndRemove(req.params.id);
      if (!page) return res.status(404).json({ message: 'Page not found' });
  
      res.json({ message: 'Page deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  

module.exports = router;
