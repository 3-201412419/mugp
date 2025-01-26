import { Client } from '@notionhq/client';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import Apply from '../models/Apply';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mugp_apply';

async function migrateToNotion() {
  try {
    // MongoDB 연결
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected...');

    // 모든 지원서 조회
    const applies = await Apply.find({ notionPageId: { $exists: false } });
    console.log(`Found ${applies.length} applications to migrate`);

    // 각 지원서를 Notion에 추가
    for (const apply of applies) {
      try {
        const response = await notion.pages.create({
          parent: {
            database_id: process.env.NOTION_APPLY_DATABASE_ID!,
          },
          properties: {
            '이름': {
              title: [
                {
                  text: {
                    content: apply.name,
                  },
                },
              ],
            },
            '이메일': {
              email: apply.email,
            },
            '연락처': {
              phone_number: apply.phone,
            },
            '카테고리': {
              select: {
                name: apply.category,
              },
            },
            '자기소개': {
              rich_text: [
                {
                  text: {
                    content: apply.message,
                  },
                },
              ],
            },
            '포토폴리오': {
              url: apply.portfolioUrl || null,
            },
            '메모': {
              rich_text: [
                {
                  text: {
                    content: '',
                  },
                },
              ],
            },
            '상태': {
              status: {
                name: '시작 전',
              },
            },
            '지원일시': {
              date: {
                start: apply.createdAt.toISOString(),
              },
            },
          },
        });

        // MongoDB 문서에 Notion 페이지 ID 저장
        apply.notionPageId = response.id;
        await apply.save();

        console.log(`Migrated application: ${apply.name} (${apply._id})`);
      } catch (error) {
        console.error(`Error migrating application ${apply._id}:`, error);
      }
    }

    console.log('Migration completed');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateToNotion();
