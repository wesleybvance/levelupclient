import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getGames } from '../../utils/data/gameData';

const initialState = {
  gameId: 0,
  description: '',
  date: '',
  time: '',
};

const EventForm = ({ user, obj }) => {
  const [games, setGames] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    // TODO: Get the games, then set the state
    getGames().then((data) => setGames(data));
    if (obj.id) {
      console.warn(obj);
      setCurrentEvent({
        id: obj.id,
        title: obj.title,
        gameId: obj.game?.id,
        date: obj.date,
        time: obj.time,
        description: obj.description,
        gamerId: user.uid,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const putEvent = {
        id: obj.id,
        description: currentEvent.description,
        time: currentEvent.time,
        date: currentEvent.date,
        gameId: Number(currentEvent.gameId),
        gamerId: user.uid,
      };
      updateEvent(putEvent).then(() => router.replace('/events'));
    } else {
      const event = {
        description: currentEvent.description,
        time: currentEvent.time,
        date: currentEvent.date,
        gameId: Number(currentEvent.gameId),
        gamerId: user.uid,
      };

      // Send POST request to your API
      console.warn(event);
      createEvent(event).then(() => router.push('/events'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput1"
          label="Description"
          className="mb-3"
        >
          <Form.Control name="description" type="text" required value={currentEvent.description} onChange={handleChange} />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Date"
          className="mb-3"
        >
          <Form.Control
            type="date"
            className="modal-input"
            name="date"
            value={currentEvent.date}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput1"
          label="Time"
          className="mb-3"
        >
          <Form.Control
            type="time"
            className="modal-input"
            name="time"
            value={currentEvent.time}
            onChange={handleChange}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingSelect" label="Game">
          <Form.Select
            placeholder="Select Game:"
            aria-label="Game"
            name="gameId"
            onChange={handleChange}
            className="mb-3"
            value={currentEvent.gameId}
            required
          >
            <option value="">Select</option>
            {games.map((game) => (
              <option
                key={game.id}
                value={game.id}
              >
                {game.title}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        {/* TODO: create the rest of the input fields */}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    game: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    id: PropTypes.number,
    description: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;
