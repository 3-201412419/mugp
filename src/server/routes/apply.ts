import express from 'express';
import { upload } from '../config/upload';
import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import Apply from '../models/Apply';

dotenv.config();

const router = express.Router();
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

router.post('/', upload.single('portfolio'), async (req, res) => {
  try {
    const { name, email, phone, category, message } = req.body;
    const portfolioUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    // MongoDB에 데이터 저장
    const applyData = {
      name,
      email,
      phone,
      category,
      message,
      portfolioUrl,
    };
    const apply = new Apply(applyData);
    await apply.save();

    // Notion에 데이터 추가
    const notionResponse = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_APPLY_DATABASE_ID!,
      },
      properties: {
        '이름': {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        '이메일': {
          email: email,
        },
        '연락처': {
          phone_number: phone,
        },
        '카테고리': {
          select: {
            name: category,
          },
        },
        '자기소개': {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        '포토폴리오': {
          url: portfolioUrl ? `${req.protocol}://${req.get('host')}${portfolioUrl}` : '',
        },
        '상태': {
          status: {
            name: '시작 전',
          },
        },
        'MongoDB ID': {
          rich_text: [
            {
              text: {
                content: apply._id.toString(),
              },
            },
          ],
        },
      },
    });

    // MongoDB 문서에 Notion 페이지 ID 추가
    apply.notionPageId = notionResponse.id;
    await apply.save();

    res.status(201).json({ 
      success: true, 
      data: {
        apply,
        notionPageId: notionResponse.id
      }
    });
  } catch (error) {
    console.error('Error in apply submission:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// 지원자 목록 조회
router.get('/list', async (_req, res) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_APPLY_DATABASE_ID!,
      sorts: [
        {
          property: '지원일시',
          direction: 'descending',
        },
      ],
    });

    const applications = await Promise.all(
      response.results.map(async (page: any) => {
        const mongoId = page.properties['MongoDB ID']?.rich_text[0]?.text.content;
        let mongoData = null;
        
        if (mongoId) {
          mongoData = await Apply.findById(mongoId);
        }

        return {
          id: page.id,
          mongoId: mongoId,
          name: page.properties['이름'].title[0]?.text.content,
          email: page.properties['이메일'].email,
          phone: page.properties['연락처'].phone_number,
          category: page.properties['카테고리'].select?.name,
          message: page.properties['자기소개'].rich_text[0]?.text.content,
          portfolio: page.properties['포토폴리오'].url,
          status: page.properties['상태'].status?.name,
          createdAt: mongoData?.createdAt || page.created_time,
          note: page.properties['메모']?.rich_text[0]?.text.content,
          mongoData: mongoData,
        };
      })
    );

    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: '지원자 목록 조회 중 오류가 발생했습니다.' });
  }
});

export default router;
