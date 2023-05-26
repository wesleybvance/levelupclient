import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const EventCard = ({
  game, //
  description,
  date,
  time,
  organizer,
}) => (
  <Card className="text-center">
    <Card.Header>{description}</Card.Header>
    <Card.Body>
      <Card.Title>{game.title}</Card.Title>
      <Card.Text>Starting at {time} on {date}</Card.Text>
      <Card.Text>Organized by {organizer.bio} - thank you!</Card.Text>
    </Card.Body>
    <Card.Footer>Hi</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    gamer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      uid: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
