import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getNotionEvents } from '../services/notionService';
import { NotionEvent } from '../types/calendar.types';

const CalendarPage: React.FC = () => {
  const [value, onChange] = React.useState(new Date());
  const [events, setEvents] = useState<NotionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const notionEvents = await getNotionEvents();
        setEvents(notionEvents.map(event => ({
          ...event,
          date: new Date(event.date)
        })));
        setLoading(false);
      } catch (err) {
        setError('Failed to load events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getTileContent = ({ date }: { date: Date }) => {
    const dayEvents = events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
    
    if (dayEvents.length > 0) {
      return (
        <EventIndicator>
          <EventDot />
          {dayEvents.length > 1 && <EventCount>{dayEvents.length}</EventCount>}
        </EventIndicator>
      );
    }
    return null;
  };

  const getSelectedDateEvents = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  if (loading) {
    return <Loading>Loading events...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <Title>CALENDAR</Title>
      <Content>
        <CalendarContainer>
          <StyledCalendar
            onChange={onChange}
            value={value}
            locale="ko-KR"
            tileContent={getTileContent}
          />
        </CalendarContainer>
        <EventList>
          <EventListTitle>
            {value.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}의 일정
          </EventListTitle>
          {getSelectedDateEvents(value).map((event) => (
            <EventItem key={event.id}>
              <EventHeader>
                <EventTitle>{event.title}</EventTitle>
              </EventHeader>
              <EventTime>
                {new Date(event.date).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </EventTime>
              {event.description && (
                <EventDescription>{event.description}</EventDescription>
              )}
            </EventItem>
          ))}
          {getSelectedDateEvents(value).length === 0 && (
            <NoEvents>이 날짜에는 일정이 없습니다</NoEvents>
          )}
        </EventList>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CalendarContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  
  .react-calendar__tile {
    padding: 1em 0.5em;
    position: relative;
  }
  
  .react-calendar__tile--now {
    background: #f0f0f0;
  }
  
  .react-calendar__tile--active {
    background: #007bff;
    color: white;
  }
`;

const EventIndicator = styled.div`
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const EventDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #007bff;
`;

const EventCount = styled.span`
  font-size: 0.7em;
  color: #007bff;
`;

const EventList = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EventListTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: #333;
`;

const EventItem = styled.div`
  padding: 1rem;
  border-radius: 6px;
  background: #f8f9fa;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: #333;
`;

const EventTime = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
`;

const NoEvents = styled.p`
  color: #666;
  text-align: center;
  font-size: 0.9rem;
  margin: 2rem 0;
`;

const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: #666;
`;

const Error = styled.div`
  text-align: center;
  padding: 40px;
  color: #ff0000;
  font-size: 1.2rem;
`;

export default CalendarPage;
