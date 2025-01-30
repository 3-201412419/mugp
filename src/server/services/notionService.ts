import { Client } from '@notionhq/client';
import dotenv from 'dotenv';
import { ApplyAttributes, ApplyStatus } from '../models/Apply';

dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const statusMapping = {
  pending: '검토 전',
  reviewing: '검토 중',
  accepted: '합격',
  rejected: '불합격'
};

export const createNotionPage = async (apply: ApplyAttributes) => {
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
                content: apply.message || '',
              },
            },
          ],
        },
        '포트폴리오': {
          url: apply.portfolioUrl || null,
        },
        '상태': {
          select: {
            name: statusMapping[apply.status || 'pending'],
          },
        },
        '생성일': {
          date: {
            start: apply.createdAt?.toISOString() || new Date().toISOString(),
          },
        },
        '수정일': {
          date: {
            start: apply.updatedAt?.toISOString() || new Date().toISOString(),
          },
        },
      },
    });

    return response.id;
  } catch (error) {
    console.error('Error creating Notion page:', error);
    throw error;
  }
};

export const updateNotionPage = async (pageId: string, apply: ApplyAttributes) => {
  try {
    await notion.pages.update({
      page_id: pageId,
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
                content: apply.message || '',
              },
            },
          ],
        },
        '포트폴리오': {
          url: apply.portfolioUrl || null,
        },
        '상태': {
          select: {
            name: statusMapping[apply.status || 'pending'],
          },
        },
        '수정일': {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    });
  } catch (error) {
    console.error('Error updating Notion page:', error);
    throw error;
  }
};

// 캘린더 이벤트 조회
export const getNotionCalendarEvents = async () => {
  try {
    if (!process.env.NOTION_CALENDAR_DATABASE_ID) {
      throw new Error('NOTION_CALENDAR_DATABASE_ID is not defined');
    }

    console.log('Using calendar database ID:', process.env.NOTION_CALENDAR_DATABASE_ID);
    
    const response = await notion.databases.query({
      database_id: process.env.NOTION_CALENDAR_DATABASE_ID,
      sorts: [
        {
          property: '날짜',
          direction: 'ascending',
        },
      ],
    });

    console.log('Notion API response:', JSON.stringify(response.results[0], null, 2));

    return response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: properties['이름']?.title[0]?.plain_text || '',
        description: properties['설명']?.rich_text[0]?.plain_text || '',
        date: properties['날짜']?.date?.start || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching calendar events from Notion:', error);
    throw error;
  }
};
