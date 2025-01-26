import express from 'express';
import { upload } from '../config/upload';
import Apply from '../models/Apply';

const router = express.Router();

router.post('/', upload.single('portfolio'), async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;
    
    const applyData = {
      name,
      email,
      phone,
      category,
      message,
      portfolioUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const apply = new Apply(applyData);
    await apply.save();

    res.status(201).json({ success: true, data: apply });
  } catch (error) {
    console.error('Error in apply submission:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;
