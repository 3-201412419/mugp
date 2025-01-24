import express, { Router } from 'express';
import Artist from '../models/Artist';

const router = Router();

// Get all artists
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category, isActive: true } : { isActive: true };
    const artists = await Artist.find(query).sort('order');
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new artist
router.post('/', async (req, res) => {
  const artist = new Artist({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    description: req.body.description,
    socialLinks: req.body.socialLinks,
    order: req.body.order,
  });

  try {
    const newArtist = await artist.save();
    res.status(201).json(newArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update artist
router.patch('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        artist[key] = req.body[key];
      }
    });

    const updatedArtist = await artist.save();
    res.json(updatedArtist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete artist (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    artist.isActive = false;
    await artist.save();
    res.json({ message: 'Artist has been deactivated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
