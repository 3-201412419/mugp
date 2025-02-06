import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

// .env 파일의 절대 경로 지정
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'zxasqw1!',
  database: process.env.MYSQL_DATABASE || 'mugp',
  logging: console.log, 
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true
  }
});

// 샘플 아티스트 데이터
const sampleArtists = [
  {
    id: 6,
    name: "인플루엔서1",
    category: "influencer",
    description: "1백만 팔로워를 보유한 뷰티/패션 인플루언서",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop",
    isActive: true,
    order: 1,
  },
  {
    id: 7,
    name: "크티레이어1",
    category: "creator",
    description: "유명 유튜브 채널 운영자, 구독자 50만",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop",
    isActive: true,
    order: 1,
  },
  {
    id: 8,
    name: "엠씨1",
    category: "mc",
    description: "방송 진행 경력 10년의 전문 MC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    isActive: true,
    order: 1,
  },
  {
    id: 9,
    name: "인플루엔서2",
    category: "influencer",
    description: "트렌디한 라이프스타일 컨텐츠 제작",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
    isActive: true,
    order: 2,
  },
  {
    id: 10,
    name: "크리에이터1",
    category: "creator",
    description: "쇼츠 전문 크리에이터, 평균 조회수 100만",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop",
    isActive: true,
    order: 2,
  }
];

// 샘플 지원자 데이터
const sampleApplies = [
  {
    id: 1,
    name: "홍길동",
    email: "hong@example.com",
    phone: "010-1234-5678",
    category: "influencer",
    message: "뷰티/패션 분야에서 활동하고 있는 인플루언서입니다. 함께 성장하고 싶습니다.",
    portfolioUrl: "https://instagram.com/sample1",
    notionPageId: "page_id_1",
    status: "pending"
  },
  {
    id: 2,
    name: "김영희",
    email: "kim@example.com",
    phone: "010-2345-6789",
    category: "creator",
    message: "게임 컨텐츠 크리에이터입니다. 구독자 20만명을 보유하고 있습니다.",
    portfolioUrl: "https://youtube.com/sample2",
    notionPageId: "page_id_2",
    status: "reviewing"
  },
  {
    id: 3,
    name: "이철수",
    email: "lee@example.com",
    phone: "010-3456-7890",
    category: "mc",
    message: "각종 행사 진행 경험이 풍부한 MC입니다.",
    portfolioUrl: "https://portfolio.sample3.com",
    notionPageId: "page_id_3",
    status: "accepted"
  },
  {
    id: 4,
    name: "박지민",
    email: "park@example.com",
    phone: "010-4567-8901",
    category: "influencer",
    message: "라이프스타일 컨텐츠 제작자입니다. 인스타그램 팔로워 5만명.",
    portfolioUrl: "https://instagram.com/sample4",
    notionPageId: "page_id_4",
    status: "rejected"
  },
  {
    id: 5,
    name: "최다은",
    email: "choi@example.com",
    phone: "010-5678-9012",
    category: "creator",
    message: "요리 컨텐츠 전문 크리에이터입니다.",
    portfolioUrl: "https://youtube.com/sample5",
    notionPageId: "page_id_5",
    status: "pending"
  }
];

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database connected successfully');

    // Sync database without dropping tables
    await sequelize.sync({ force: false, alter: true });
    
    // Import models
    const Artist = require('../models/Artist').default;
    const Apply = require('../models/Apply').default;
    
    // Check if artists table is empty
    const artistCount = await Artist.count();
    if (artistCount === 0) {
      // Insert sample data only if table is empty
      await Artist.bulkCreate(sampleArtists);
      console.log('Sample artists data inserted successfully');
    } else {
      console.log('Artists data already exists, skipping sample data insertion');
    }

    // Check if applies table is empty
    const applyCount = await Apply.count();
    if (applyCount === 0) {
      // Insert sample data only if table is empty
      await Apply.bulkCreate(sampleApplies);
      console.log('Sample applies data inserted successfully');
    } else {
      console.log('Applies data already exists, skipping sample data insertion');
    }

    console.log('Database synchronized - Tables updated');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;
