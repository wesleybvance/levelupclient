/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

export default function GameCard({
  id,
  title, //
  maker,
  numberOfPlayers,
  skillLevel,
  onUpdate,
}) {
  const router = useRouter();

  const deleteGameCard = () => {
    if (window.confirm(`Do you want to delete ${title} and all of its events?`)) {
      deleteGame(id).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
      </Card.Body>
      <Button className="edit-game" variant="black" onClick={(e) => router.replace(`/games/edit/${id}`)}>Update Game</Button>
      <Button className="delete-game" variant="black" onClick={deleteGameCard}>Delete Game</Button>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
    </Card>
  );
}

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// const GameCard = ({
//   id,
//   title, //
//   maker,
//   numberOfPlayers,
//   skillLevel,
// }) => (
//   <Card className="text-center">
//     <Card.Header>{title}</Card.Header>
//     <Card.Body>
//       <Card.Title>By: {maker}</Card.Title>
//       <Card.Text>{numberOfPlayers} players needed</Card.Text>
//     </Card.Body>
//     <Button className="edit-game" variant="black" onClick={(e) => router.replace(`/games/${id}`)}>Update Game</Button>
//     <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
//   </Card>
// );

// GameCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   maker: PropTypes.string.isRequired,
//   numberOfPlayers: PropTypes.number.isRequired,
//   skillLevel: PropTypes.number.isRequired,
// };

// export default GameCard;
