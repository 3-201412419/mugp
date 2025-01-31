import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getNotionEvents } from '../services/notionService';
import { NotionEvent } from '../types/calendar.types';

interface CalendarProps {
  onChange: (date: Date) => void;
  value: Date;
}

const CalendarPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<NotionEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDateChange = (date: any) => {
    if (date instanceof Date) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const notionEvents = await getNotionEvents();
        setEvents(notionEvents.map(event => ({
          ...event,
          date: new Date(event.date),
          category: event.category || 'default'
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
          {[...Array(Math.min(dayEvents.length, 3))].map((_, i) => (
            <EventDot key={i} />
          ))}
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
            onChange={onDateChange}
            value={selectedDate}
            locale="ko-KR"
            tileContent={getTileContent}
          />
        </CalendarContainer>
        <EventList>
          <EventListTitle>
            {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}의 일정
          </EventListTitle>
          {getSelectedDateEvents(selectedDate).map((event) => (
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
          {getSelectedDateEvents(selectedDate).length === 0 && (
            <NoEvents>이 날짜에는 일정이 없습니다</NoEvents>
          )}
        </EventList>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 4rem;
  font-size: 3rem;
  color: #000;
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #000;
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    
    &:after {
      width: 60px;
      height: 3px;
      bottom: -10px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  gap: 4rem;
  align-items: flex-start;
  background: #f8f9fa;
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem;
    border-radius: 20px;
  }
`;

const CalendarContainer = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
  }
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  font-family: 'Pretendard', sans-serif;
  
  @media (max-width: 768px) {
    .react-calendar__navigation {
      margin-bottom: 1rem;
      padding: 0;
      
      button {
        width: 36px;
        height: 36px;
        padding: 0;
        
        &.react-calendar__navigation__arrow {
          &::before {
            width: 8px;
            height: 8px;
            border-width: 1.5px 1.5px 0 0;
          }
        }
      }
      
      .react-calendar__navigation__label {
        font-size: 18px;
        padding: 8px;
        border-radius: 8px;
        
        span {
          font-size: 18px;
        }
      }
    }
    
    .react-calendar__month-view__weekdays {
      font-size: 0.75em;
      padding: 4px 0;
      margin-bottom: 4px;
      
      abbr {
        color: #999;
      }
    }
    
    .react-calendar__month-view__days {
      display: grid !important;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background-color: #f0f0f0;
      padding: 1px;
      border-radius: 12px;
    }
    
    .react-calendar__tile {
      aspect-ratio: unset;
      height: 48px;
      margin: 0;
      padding: 0;
      background: white;
      font-size: 14px;
      position: relative;
      
      &:first-child {
        border-top-left-radius: 12px;
      }
      
      &:nth-child(7) {
        border-top-right-radius: 12px;
      }
      
      &:nth-last-child(-n+7):first-child {
        border-bottom-left-radius: 12px;
      }
      
      &:last-child {
        border-bottom-right-radius: 12px;
      }
      
      abbr {
        font-weight: 500;
      }
      
      &:enabled:hover {
        background-color: #f8f9fa;
      }
      
      &.react-calendar__tile--now {
        background: #f8f9fa;
        font-weight: 700;
        
        &:after {
          bottom: 4px;
          width: 4px;
          height: 4px;
        }
      }
      
      &.react-calendar__tile--active {
        background: #000 !important;
        color: white;
        border-radius: 0;
        
        &:enabled:hover {
          background: #333 !important;
        }
      }
    }
    
    .react-calendar__month-view__days__day--weekend {
      color: blue;
      
      &:nth-child(7n) {
        color: red;
      }
    }
  }
  
  /* Desktop styles remain unchanged */
  @media (min-width: 769px) {
    .react-calendar__navigation {
      margin-bottom: 40px;
      padding: 0 20px;
      
      button {
        width: 48px;
        height: 48px;
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        border-radius: 50%;
        font-size: 0;
        position: relative;
        
        &:hover {
          background-color: #f8f9fa;
        }
        
        &:disabled {
          opacity: 0.3;
        }
        
        &.react-calendar__navigation__arrow {
          &::before {
            content: '';
            width: 10px;
            height: 10px;
            border-style: solid;
            border-width: 2px 2px 0 0;
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 50%;
          }
        }
        
        &.react-calendar__navigation__prev-button::before {
          transform: translate(-30%, -50%) rotate(-135deg);
        }
        
        &.react-calendar__navigation__next-button::before {
          transform: translate(-70%, -50%) rotate(45deg);
        }
        
        &.react-calendar__navigation__prev2-button,
        &.react-calendar__navigation__next2-button {
          display: none;
        }
      }
      
      .react-calendar__navigation__label {
        font-weight: 700;
        font-size: 24px;
        flex-grow: 0;
        padding: 10px 20px;
        border-radius: 12px;
        
        &:hover {
          background-color: #f8f9fa;
        }
        
        span {
          font-size: 24px;
        }
      }
    }
    
    .react-calendar__month-view__weekdays {
      text-transform: uppercase;
      font-weight: 600;
      font-size: 0.9em;
      color: #666;
      padding: 10px 0;
      margin-bottom: 10px;
      
      abbr {
        text-decoration: none;
        cursor: default;
      }
    }
    
    .react-calendar__month-view__days__day--weekend {
      color: blue;
      
      &.react-calendar__month-view__days__day:nth-child(7n) {
        color: red;  /* 일요일 */
      }
    }
    
    .react-calendar__tile {
      aspect-ratio: 1;
      padding: 0;
      position: relative;
      font-size: 1.1em;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      border-radius: 50%;
      margin: 5px 0;
      
      abbr {
        z-index: 1;
      }
      
      &:enabled:hover {
        background-color: #f8f9fa;
      }
      
      &.react-calendar__tile--now {
        background: transparent;
        color: #000;
        font-weight: 700;
        
        &:after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #000;
        }
      }
      
      &.react-calendar__tile--active {
        background: #000 !important;
        color: white;
        
        &:enabled:hover {
          background: #333 !important;
        }
      }
    }
  }
`;

const EventIndicator = styled.div`
  position: absolute;
  display: flex;
  gap: 3px;
  padding: 3px 6px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    top: auto;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    gap: 2px;
    padding: 0;
    background: transparent;
  }
`;

const EventDot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #4a90e2;
  
  @media (max-width: 768px) {
    width: 3px;
    height: 3px;
  }
  
  &:nth-child(2) {
    background-color: #50c878;
  }
  
  &:nth-child(3) {
    background-color: #f39c12;
  }
`;

const EventList = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.03);
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

const EventListTitle = styled.h2`
  font-size: 1.5rem;
  color: #000;
  font-weight: 700;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
`;

const EventItem = styled.div`
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 16px;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;
  
  &:hover {
    background: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.8rem;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  color: #000;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
`;

const EventTime = styled.span`
  font-size: 0.9rem;
  color: #666;
  white-space: nowrap;
  background: #fff;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 500;
`;

const EventDescription = styled.p`
  font-size: 0.95rem;
  color: #666;
  margin: 0;
  line-height: 1.6;
`;

const NoEvents = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 1rem;
  background: #f8f9fa;
  border-radius: 16px;
  border: 2px dashed #e9ecef;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 1.1rem;
  color: #666;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 1.1rem;
  color: #ff5252;
`;

export default CalendarPage;
