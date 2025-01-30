import { Router, Request, Response } from 'express';
import { getNotionCalendarEvents } from '../services/notionService';

const router = Router();

// Test route
router.get('/test', (_req: Request, res: Response) => {
  res.json({ message: 'Calendar router is working' });
});

// 캘린더 이벤트 조회
router.get('/events', async (_req: Request, res: Response) => {
  try {
    console.log('Fetching calendar events from Notion...');
    const events = await getNotionCalendarEvents();
    console.log('Fetched events:', events);
    res.json(events);
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
