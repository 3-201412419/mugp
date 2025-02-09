import { Router, Request, Response, NextFunction } from 'express';
import Artist from '../models/Artist';
import ArtistImage from '../models/ArtistImage';
import { WhereOptions } from 'sequelize';
import { ArtistAttributes } from '../models/Artist';

const router = Router();

type AsyncRequestHandler<P = {}, ResBody = any, ReqBody = any, ReqQuery = any> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<void>;

interface GetArtistQuery {
  category?: string;
  name?: string;
}

interface CreateArtistBody {
  name: string;
  category: ArtistAttributes['category'];
  image: string;
  description: string;
  sort_order?: number;
}

interface UpdateArtistBody extends CreateArtistBody {
  isActive?: boolean;
}

interface ArtistParams {
  id: string;
}

// 아티스트 목록 조회
const getArtists: AsyncRequestHandler<{}, any, any, GetArtistQuery> = async (req, res) => {
  try {
    const { category, name } = req.query;
    console.log('Received request for artists with category:', category, 'and name:', name);

    const where: WhereOptions<ArtistAttributes> = {
      isActive: true,
      ...(category ? { category: category as ArtistAttributes['category'] } : {}),
      ...(name ? { name: decodeURIComponent(name as string) } : {})
    };

    const artists = await Artist.findAll({
      where,
      include: [{
        model: ArtistImage,
        as: 'images',
        attributes: ['id', 'image', 'sort_order'],
      }],
      order: [['sort_order', 'ASC'], [{ model: ArtistImage, as: 'images' }, 'sort_order', 'ASC']]
    });

    if (artists.length === 0) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }

    res.json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// 새 아티스트 생성
const createArtist: AsyncRequestHandler<{}, any, CreateArtistBody> = async (req, res) => {
  try {
    const artist = await Artist.create({
      name: req.body.name,
      category: req.body.category,
      image: req.body.image,
      description: req.body.description,
      sort_order: req.body.sort_order || 0,
      isActive: true
    });

    res.status(201).json(artist);
  } catch (error) {
    console.error('Error creating artist:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// 아티스트 수정
const updateArtist: AsyncRequestHandler<ArtistParams, any, UpdateArtistBody> = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(Number(id));

    if (!artist) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }

    // 업데이트할 필드만 포함하는 객체 생성
    const updateFields: Partial<UpdateArtistBody> = {};
    
    if (req.body.name) updateFields.name = req.body.name;
    if (req.body.category) updateFields.category = req.body.category;
    if (req.body.description) updateFields.description = req.body.description;
    if (req.body.image && req.body.image !== artist.image) updateFields.image = req.body.image;
    if (typeof req.body.sort_order !== 'undefined') updateFields.sort_order = req.body.sort_order;
    if (typeof req.body.isActive !== 'undefined') updateFields.isActive = req.body.isActive;

    await artist.update(updateFields);

    res.json(artist);
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// 아티스트 삭제
const deleteArtist: AsyncRequestHandler<ArtistParams> = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findByPk(Number(id));

    if (!artist) {
      res.status(404).json({ error: 'Artist not found' });
      return;
    }

    await artist.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// 라우트 설정
router.get('/', getArtists);
router.post('/', createArtist);
router.put('/:id', updateArtist);
router.delete('/:id', deleteArtist);

export default router;
