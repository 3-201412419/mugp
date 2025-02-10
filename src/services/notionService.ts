import axios from 'axios';

export interface NotionEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export const getNotionEvents = async (): Promise<NotionEvent[]> => {
  try {
    const response = await fetch('/api/calendar/events');
    
    if (!response.ok) {
      const text = await response.text();
      console.error('API Response:', text);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Calendar events response:', data);
    
    if (!Array.isArray(data)) {
      console.error('Unexpected response format:', data);
      return [];
    }
    
    return data.map(event => ({
      ...event,
      date: new Date(event.date).toISOString(),
      category: event.category || 'default'
    }));
  } catch (error) {
    console.error('Error in getNotionEvents:', error);
    throw error;
  }
};
