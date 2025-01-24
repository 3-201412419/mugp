import { NotionEvent } from '../types/calendar.types';

const API_BASE_URL = 'http://localhost:5000/api';

export const getNotionEvents = async (): Promise<NotionEvent[]> => {
  try {
    console.log('Fetching events from server...');
    const response = await fetch(`${API_BASE_URL}/calendar/events`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server error:', errorData);
      throw new Error(`Failed to fetch events: ${errorData.details || 'Unknown error'}`);
    }
    
    const events = await response.json();
    console.log('Received events from server:', events);
    
    const processedEvents = events.map((event: any) => {
      const processedEvent = {
        ...event,
        date: new Date(event.date)
      };
      console.log('Processed event:', processedEvent);
      return processedEvent;
    });
    
    console.log('Final processed events:', processedEvents);
    return processedEvents;
  } catch (error) {
    console.error('Error in getNotionEvents:', error);
    return [];
  }
};
