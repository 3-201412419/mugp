import axios from 'axios';

export interface NotionEvent {
  id: string;
  title: string;
  description: string;
  date: string;
}

// API URL을 환경 변수에서 가져오거나 기본값 사용
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getNotionEvents = async (): Promise<NotionEvent[]> => {
  try {
    const response = await axios.get<NotionEvent[]>(`${API_URL}/api/calendar/events`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Calendar events response:', response.data);
    
    return response.data.map(event => ({
      ...event,
      date: new Date(event.date).toISOString()
    }));
  } catch (error) {
    console.error('Error in getNotionEvents:', error);
    return [];
  }
};
