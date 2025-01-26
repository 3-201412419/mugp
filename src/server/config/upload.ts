import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // 원본 파일명에서 특수문자 제거 및 공백을 언더스코어로 변경
    const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
      .replace(/[^\w\s.-]/g, '')
      .replace(/\s+/g, '_');
    
    const ext = path.extname(originalname);
    const basename = path.basename(originalname, ext);
    
    // 타임스탬프_정제된파일명.확장자 형식으로 저장
    cb(null, `${Date.now()}_${basename}${ext}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
