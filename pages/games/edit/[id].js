import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import GameForm from '../../../components/game/GameForm';
import { useAuth } from '../../../utils/context/authContext';
import { getSingleGame } from '../../../utils/data/gameData';

export default function EditGame() {
  const { user } = useAuth();
  const router = useRouter();
  const gameId = router.query;
  const [editGame, setEditGame] = useState({});

  useEffect(() => {
    getSingleGame(gameId.id).then(setEditGame);
  }, [gameId]);

  return (
    <div>
      <h2>Update {editGame.title}</h2>
      <GameForm user={user} obj={editGame} />
    </div>
  );
}
