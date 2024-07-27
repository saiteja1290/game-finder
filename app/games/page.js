'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
// import GameCard from '@/components/GameCard';
import GameCard from '../components/GameCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Games() {
    const [games, setGames] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('/api/games', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGames(response.data);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };

    const handleJoinGame = async (gameId) => {
        try {
            await axios.post(`/api/games/${gameId}/join`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchGames();
        } catch (error) {
            console.error('Failed to join game:', error.response?.data?.error || error.message);
            // Handle error (e.g., show an error message to the user)
        }
    };

    const handleCreateGame = () => {
        router.push('/create-game');
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Games Near You</h1>
            <Button onClick={handleCreateGame} className="mb-5">Create Game</Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                    <GameCard key={game.id} game={game} onJoin={handleJoinGame} />
                ))}
            </div>
        </div>
    );
}