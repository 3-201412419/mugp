import express from 'express';
import Artist from '../models/Artist';
import { WhereOptions } from 'sequelize';
import { ArtistAttributes } from '../models/Artist';

const router = express.Router();

// 아티스트 목록 조회
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const where: WhereOptions<ArtistAttributes> = {
      isActive: true,
      ...(category ? { category: category as string } : {})
    };

    const artists = await Artist.findAll({
      where,
      order: [
        ['order', 'ASC']
      ]
    });
    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
