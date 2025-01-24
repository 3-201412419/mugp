import express from 'express';
import { Artist } from '../models/Artist';

const router = express.Router();

// 모든 아티스트 조회
router.get('/', async (req, res) => {
    try {
        const artists = await Artist.find({ isActive: true }).sort({ order: 1 });
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching artists', error });
    }
});

// 카테고리별 아티스트 조회
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const artists = await Artist.find({ 
            category, 
            isActive: true 
        }).sort({ order: 1 });
        res.json(artists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching artists by category', error });
    }
});

export default router;
