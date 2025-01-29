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

    // MySQL에 데이터 저장
    const apply = await Apply.create({
      name,
      email,
      phone,
      category,
      message,
      portfolioUrl,
    });

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
        'MySQL ID': {
          rich_text: [
            {
              text: {
                content: apply.id.toString(),
              },
            },
          ],
        },
      },
    });

    // MySQL 레코드에 Notion 페이지 ID 추가
    await apply.update({
      notionPageId: notionResponse.id,
    });

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
    const applications = await Apply.findAll({
      order: [['createdAt', 'DESC']],
    });

    const result = await Promise.all(
      applications.map(async (application) => {
        const notionPageId = application.notionPageId;
        let notionData = null;

        if (notionPageId) {
          notionData = await notion.pages.retrieve({
            page_id: notionPageId,
          });
        }

        return {
          id: application.id,
          name: application.name,
          email: application.email,
          phone: application.phone,
          category: application.category,
          message: application.message,
          portfolio: application.portfolioUrl,
          status: application.status,
          createdAt: application.createdAt,
          notionPageId: notionPageId,
          notionData: notionData,
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: '지원자 목록 조회 중 오류가 발생했습니다.' });
  }
});

export default router;
