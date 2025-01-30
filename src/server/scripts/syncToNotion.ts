import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
import * as path from 'path';
import Apply from '../models/Apply';
import { createNotionPage } from '../services/notionService';

// .env 파일 설정
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// 데이터베이스 연결
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'zxasqw1!',
  database: process.env.MYSQL_DATABASE || 'mugp',
  logging: false,
});

async function syncToNotion() {
  try {
    // 데이터베이스 연결 확인
    await sequelize.authenticate();
    console.log('MySQL Database connected successfully');

    // notionPageId가 없는 모든 지원서 조회
    const applies = await Apply.findAll({
      where: {
        notionPageId: null
      }
    });

    console.log(`Found ${applies.length} applications to sync with Notion`);

    // 각 지원서를 Notion에 동기화
    for (const apply of applies) {
      try {
        const notionPageId = await createNotionPage(apply);
        await apply.update({ notionPageId });
        console.log(`Synced application: ${apply.name} (ID: ${apply.id})`);
      } catch (error) {
        console.error(`Failed to sync application ${apply.id}:`, error);
      }
    }

    console.log('Sync completed');
    process.exit(0);
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

// 스크립트 실행
syncToNotion();
