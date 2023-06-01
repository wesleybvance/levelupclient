import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createGame, getGameTypes, updateGame } from '../../utils/data/gameData';

const initialState = {
  id: 0,
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameType: 0,
};

const GameForm = ({ user, obj }) => {
  const [gameTypes, setGameTypes] = useState([]);
  /*
  Since the input fields are bound to the values of
  the properties of this state variable, you need to
  provide some default values.
  */
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    // TODO: Get the game types, then set the state
    getGameTypes().then((data) => setGameTypes(data));
    if (obj.id) {
      setCurrentGame({
        id: obj.id,
        gameType: obj.game_type?.id,
        skillLevel: obj.skill_level,
        numberOfPlayers: obj.number_of_players,
        maker: obj.maker,
        title: obj.title,
        userId: user.uid,
      });
    }
  }, [obj, user]);

  const handleChange = (e) => {
    // TODO: Complete the onChange function
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const putGame = {
        id: obj.id,
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      updateGame(putGame).then(() => router.replace('/games'));
    } else {
      const game = {
        maker: currentGame.maker,
        title: currentGame.title,
        numberOfPlayers: Number(currentGame.numberOfPlayers),
        skillLevel: Number(currentGame.skillLevel),
        gameType: Number(currentGame.gameType),
        userId: user.uid,
      };
      // Send POST request to your API
      createGame(game).then(() => router.replace('/games'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput1"
            label="Title"
            className="mb-3"
          >
            <Form.Control name="title" type="text" required value={currentGame.title} onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput1"
            label="Maker"
            className="mb-3"
          >
            <Form.Control name="maker" type="text" required value={currentGame.maker} onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput1"
            label="Number Of Players"
            className="mb-3"
          >
            <Form.Control name="numberOfPlayers" type="number" required value={currentGame.numberOfPlayers} onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <Form.Group className="mb-3">
          <FloatingLabel
            controlId="floatingInput1"
            label="Skill Level"
            className="mb-3"
          >
            <Form.Control name="skillLevel" type="number" required value={currentGame.skillLevel} onChange={handleChange} />
          </FloatingLabel>
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="Game Type">
          <Form.Select
            placeholder="Select Game Type:"
            aria-label="Game Type"
            name="gameType"
            onChange={handleChange}
            className="mb-3"
            value={currentGame.gameType}
            required
          >
            <option value="">Select</option>
            {gameTypes.map((gameType) => (
              <option
                key={gameType.id}
                value={gameType?.id}
              >
                {gameType.label}
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

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    maker: PropTypes.string,
    number_of_players: PropTypes.number,
    skill_level: PropTypes.number,
    game_type: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }),
};

GameForm.defaultProps = {
  obj: initialState,
};

export default GameForm;
