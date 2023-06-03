import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import EventCard from '../../components/events/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const getAllEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard game={event.game} description={event.description} date={event.date} time={event.time} organizer={event.organizer} id={event.id} onUpdate={getAllEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
