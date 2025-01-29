const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// Get all artists
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category, isActive: true } : { isActive: true };
    const artists = await Artist.findAll({
      where,
      order: [['order', 'ASC']]
    });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new artist
router.post('/', async (req, res) => {
  try {
    const newArtist = await Artist.create({
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      description: req.body.description,
      socialLinks: req.body.socialLinks,
      order: req.body.order,
    });
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update artist
router.patch('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    await artist.update(req.body);
    const updatedArtist = await artist.reload();
    res.json(updatedArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete artist (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    await artist.update({ isActive: false });
    res.json({ message: 'Artist has been deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
