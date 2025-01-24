const express = require('express');
const { Client } = require('@notionhq/client');
const router = express.Router();
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

console.log('Environment variables:', {
  NOTION_API_KEY: process.env.NOTION_API_KEY,
  NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID
});

const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

const databaseId = process.env.NOTION_DATABASE_ID;

router.get('/events', async (req, res) => {
  try {
    console.log('Fetching events from Notion...');
    console.log('Database ID:', databaseId);
    
    const response = await notion.databases.query({
      database_id: databaseId
    });

    const events = response.results.map((page) => {
      console.log('Raw page properties:', JSON.stringify(page.properties, null, 2));
      
      const event = {
        id: page.id,
        title: page.properties['이름']?.title[0]?.plain_text || '',
        date: page.properties['날짜']?.date?.start || '',
        description: page.properties['설명']?.rich_text[0]?.plain_text || '',
        category: page.properties['카테고리']?.select?.name || ''
      };
      
      console.log('Processed event:', event);
      return event;
    });

    console.log('Sending events to client:', events);
    res.json(events);
  } catch (error) {
    console.error('Error fetching Notion events:', error);
    res.status(500).json({ error: 'Failed to fetch events', details: error.message });
  }
});

module.exports = router;
