import { VercelRequest, VercelResponse } from '@vercel/node';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_CALENDAR_DATABASE_ID;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!DATABASE_ID) {
      throw new Error('NOTION_CALENDAR_DATABASE_ID is not defined');
    }

    // 먼저 데이터베이스 정보를 가져와서 속성을 확인
    const database = await notion.databases.retrieve({
      database_id: DATABASE_ID,
    });

    console.log('Database properties:', database.properties);

    // 데이터베이스 쿼리
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      // 정렬은 나중에 JavaScript에서 처리
    });

    console.log('Notion API Response:', JSON.stringify(response, null, 2));

    const events = response.results.map((page: any) => {
      const properties = page.properties;
      console.log('Page properties:', properties);
      
      // 각 속성의 실제 이름을 로깅
      Object.entries(properties).forEach(([key, value]) => {
        console.log(`Property ${key}:`, value);
      });

      return {
        id: page.id,
        title: properties.Name?.title[0]?.plain_text || 
               properties.name?.title[0]?.plain_text || 
               properties['이름']?.title[0]?.plain_text || '',
        description: properties.Description?.rich_text[0]?.plain_text || 
                    properties.description?.rich_text[0]?.plain_text || 
                    properties['설명']?.rich_text[0]?.plain_text || '',
        date: properties.Date?.date?.start || 
              properties.date?.date?.start || 
              properties['날짜']?.date?.start || '',
        category: properties.Category?.select?.name || 
                 properties.category?.select?.name || 
                 properties['카테고리']?.select?.name || 'default',
      };
    });

    // JavaScript에서 날짜순으로 정렬
    const sortedEvents = events.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    console.log('Processed Events:', sortedEvents);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(sortedEvents);
  } catch (error) {
    console.error('Error fetching Notion events:', error);
    return res.status(500).json({ message: 'Error fetching events', error });
  }
}
