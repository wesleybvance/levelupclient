/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card } from 'react-bootstrap';

export default function EventCard({
  id,
  game, //
  description,
  date,
  time,
  organizer,
}) {
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Card.Text>Starting at {time} on {date}</Card.Text>
        <Card.Text>Organized by {organizer.bio} - thank you!</Card.Text>
      </Card.Body>
      <Button className="edit-event" variant="black" onClick={(e) => router.replace(`/events/edit/${id}`)}>Update Event</Button>
      <Card.Footer>Hi</Card.Footer>
    </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
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
