import axios from 'axios';

export interface NotionEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

// API URL을 환경 변수에서 가져오거나 기본값 사용
const baseURL = import.meta.env.PROD 
  ? 'https://mugp.vercel.app' 
  : 'http://localhost:5000';

export const getNotionEvents = async (): Promise<NotionEvent[]> => {
  try {
    const response = await fetch(`${baseURL}/api/calendar/events`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
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
