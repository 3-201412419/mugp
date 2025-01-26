import express from 'express';
import Artist from '../models/Artist';

const router = express.Router();

// 아티스트 목록 조회
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    
    const artists = await Artist.find(query).sort('order');
    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
