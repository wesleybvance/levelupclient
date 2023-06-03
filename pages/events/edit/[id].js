import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleEvent } from '../../../utils/data/eventData';
import EventForm from '../../../components/events/EventForm';

export default function EditEvent() {
  const { user } = useAuth();
  const router = useRouter();
  const eventId = router.query;
  const [editEvent, setEditEvent] = useState({});

  useEffect(() => {
    getSingleEvent(eventId.id).then(setEditEvent);
  }, [eventId]);

  return (
    <div>
      <h2>Update {editEvent.title}</h2>
      <EventForm user={user} obj={editEvent} />
    </div>
  );
}
