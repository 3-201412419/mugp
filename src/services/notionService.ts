import axios from 'axios';

export interface NotionEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getNotionEvents = async (): Promise<NotionEvent[]> => {
  try {
    const response = await axios.get<NotionEvent[]>(`${API_URL}/calendar/events`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Calendar events response:', response.data);
    
    if (!Array.isArray(response.data)) {
      console.error('Invalid response format:', response.data);
      return [];
    }

    return response.data.map(event => ({
      ...event,
      date: new Date(event.date).toISOString(),
      category: event.category || 'default'
    }));
  } catch (error) {
    console.error('Error in getNotionEvents:', error);
    throw error;
  }
};
