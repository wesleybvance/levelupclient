import EventForm from '../../components/events/EventForm';
import { useAuth } from '../../utils/context/authContext';

const NewEvent = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Register New Game</h2>
      <EventForm user={user} />
    </div>
  );
};

export default NewEvent;
