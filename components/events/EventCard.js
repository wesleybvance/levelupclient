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
    <Card.Header>{game.Title}</Card.Header>
    <Card.Body>
      <Card.Title>{description}</Card.Title>
      <Card.Text>Starting at {time} on {date}</Card.Text>
      <Card.Text>Organized by {organizer.bio} - thank you!</Card.Text>
    </Card.Body>
    <Card.Footer>Hi</Card.Footer>
  </Card>
);

EventCard.propTypes = {
  game: PropTypes.shape.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  organizer: PropTypes.shape.isRequired,
};

export default EventCard;
