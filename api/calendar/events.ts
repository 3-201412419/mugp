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

    console.log('Using Database ID:', DATABASE_ID);

    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          property: 'Date',
          direction: 'ascending',
        },
      ],
    });

    console.log('Notion API Response:', JSON.stringify(response, null, 2));

    const events = response.results.map((page: any) => {
      const properties = page.properties;
      return {
        id: page.id,
        title: properties.Name.title[0]?.plain_text || '',
        description: properties.Description?.rich_text[0]?.plain_text || '',
        date: properties.Date?.date?.start || '',
        category: properties.Category?.select?.name || 'default',
      };
    });

    console.log('Processed Events:', events);

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching Notion events:', error);
    return res.status(500).json({ message: 'Error fetching events', error });
  }
}
