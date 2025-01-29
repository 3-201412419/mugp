import express from 'express';
import Artist from '../models/Artist';
import { WhereOptions } from 'sequelize';
import { ArtistAttributes } from '../models/Artist';

const router = express.Router();

// 샘플 이미지 URL 업데이트
const updateImageUrls = async () => {
  try {
    const sampleImageUrl = 'https://via.placeholder.com/300x400';
    await Artist.update(
      { image: sampleImageUrl },
      { where: {} }
    );
    console.log('Sample image URLs updated successfully');
  } catch (error) {
    console.error('Error updating image URLs:', error);
  }
};

// 서버 시작시 이미지 URL 업데이트
updateImageUrls();

// 아티스트 목록 조회
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    console.log('Received request for artists with category:', category);

    const where: WhereOptions<ArtistAttributes> = {
      isActive: true,
      ...(category ? { category: category as string } : {})
    };
    console.log('Query conditions:', where);

    const artists = await Artist.findAll({
      where,
      order: [
        ['order', 'ASC']
      ]
    });

    console.log(`Found ${artists.length} artists`);
    if (artists.length === 0) {
      console.log('No artists found for the given criteria');
    }

    res.json(artists);
  } catch (error) {
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
