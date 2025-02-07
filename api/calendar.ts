import { Client } from '@notionhq/client';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    return res.status(200).end();
  }

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

    const events = response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: properties['이름']?.title[0]?.plain_text || '',
        description: properties['설명']?.rich_text[0]?.plain_text || '',
        date: properties['날짜']?.date?.start || new Date().toISOString(),
      };
    });

    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching calendar events from Notion:', error);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
}
