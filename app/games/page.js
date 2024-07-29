"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import GameCard from '../components/GameCard';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Games() {
    const [games, setGames] = useState([]);  // Ensure games is initialized as an empty array
    const [joinedGames, setJoinedGames] = useState(new Set());
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const router = useRouter();

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        setLoading(true);
        setError(null);  // Reset error state before fetching
        try {
            const response = await axios.get('/api/games', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            // Log the response data for debugging
            console.log(response.data);

            if (response.data && Array.isArray(response.data.games)) {
                setGames(response.data.games);
                setJoinedGames(new Set(response.data.joinedGames)); // Assuming API provides a list of joined game IDs
            } else {
                setError('Unexpected response format');
            }
        } catch (error) {
            console.error('Failed to fetch games:', error);
            setError('Failed to load games. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleJoinGame = async (gameId) => {
        try {
            await axios.post(`/api/games/${gameId}/join`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchGames(); // Refresh the list after joining
        } catch (error) {
            console.error('Failed to join game:', error.response?.data?.error || error.message);
        }
    };

    const handleUnjoinGame = async (gameId) => {
        try {
            await axios.post(`/api/games/${gameId}/unjoin`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchGames(); // Refresh the list after unjoining
        } catch (error) {
            console.error('Failed to unjoin game:', error.response?.data?.error || error.message);
        }
    };

    const handleCreateGame = () => {
        router.push('/create-game');
    };

    if (loading) {
        return <div>Loading games...</div>;  // Loading state
    }

    if (error) {
        return <div>{error}</div>;  // Error state
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Games Near You</h1>
            <Button onClick={handleCreateGame} className="mb-5">Create Game</Button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                    <GameCard
                        key={game._id}
                        game={game}
                        onJoin={handleJoinGame}
                        onUnjoin={handleUnjoinGame}
                        userJoined={joinedGames.has(game._id)} // Check if the user has joined the game
                    />
                ))}
            </div>
        </div>
    );
}
