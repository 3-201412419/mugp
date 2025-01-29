import express, { Request, Response, Router } from 'express';
import Apply, { VALID_CATEGORIES } from '../models/Apply';
import { upload } from '../config/upload';
import dotenv from 'dotenv';

dotenv.config();
const router: Router = express.Router();

interface ApplyRequest {
  name: string;
  email: string;
  phone: string;
  category: string;
  message?: string;
}

// 지원서 제출
router.post('/', upload.single('portfolio'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, category, message } = req.body;
    const portfolioUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // 카테고리 유효성 검사
    if (!VALID_CATEGORIES.includes(category as any)) {
      res.status(400).json({
        error: '잘못된 카테고리입니다.',
        validCategories: VALID_CATEGORIES
      });
      return;
    }

    // DB에 저장
    const apply = await Apply.create({
      name,
      email,
      phone,
      category: category as any,
      message,
      portfolioUrl,
      status: 'pending'
    });

    res.status(201).json(apply);
  } catch (error) {
    console.error('Error in apply submission:', error);
    res.status(500).json({ 
      error: '지원서 제출 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    });
  }
});

export default router;
