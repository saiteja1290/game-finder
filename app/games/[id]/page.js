'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GameDetails({ params }) {
    const [game, setGame] = useState(null);
    const [players, setPlayers] = useState([]);
    const [userJoined, setUserJoined] = useState(false); // Track if the user has joined
    const router = useRouter();

    useEffect(() => {
        fetchGameDetails();
    }, []);

    const fetchGameDetails = async () => {
        try {
            const response = await axios.get(`/api/games/${params.id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGame(response.data.game);
            setPlayers(response.data.players);
            // Check if the user is part of the players list
            const token = localStorage.getItem('token');
            const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null; // Decode token to get userId
            setUserJoined(response.data.players.some(player => player._id === userId));
        } catch (error) {
            console.error('Failed to fetch game details:', error);
        }
    };

    const handleJoinGame = async () => {
        try {
            await axios.post(`/api/games/${params.id}/join`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchGameDetails();
        } catch (error) {
            console.error('Failed to join game:', error);
        }
    };

    const handleUnjoinGame = async () => {
        try {
            await axios.post(`/api/games/${params.id}/unjoin`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            fetchGameDetails();
        } catch (error) {
            console.error('Failed to unjoin game:', error);
        }
    };

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>{game.location}</CardTitle>
                    <CardDescription>Date: {game.date}</CardDescription>
                    <CardDescription className='text-sm'>
                        Created By: {players.length > 0 ? players[0].username : 'Unknown'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Price: {game.price}/-</p>
                    <p>Players: {game.currentPlayers}/{game.totalPlayers}</p>
                    <h3 className="mt-4 font-bold">Players:</h3>
                    <ul className="list-disc pl-5">
                        {players.map((player) => (
                            <li key={player._id}>{player.username}</li>
                        ))}
                    </ul>
                    {game.currentPlayers < game.totalPlayers && !userJoined && (
                        <Button onClick={handleJoinGame} className="mt-4">Join Game</Button>
                    )}
                    {userJoined && (
                        <Button onClick={handleUnjoinGame} className="mt-4 " variant="destructive">Unjoin</Button>
                        // <Button onClick={handleUnjoinGame} className="mt-4 bg-red-700 text-red">Unjoin Game</Button>
                    )}
                </CardContent>
            </Card>
            <Button onClick={() => router.push('/games')} className="mt-4">Back to Games</Button>
        </div>
    );
}
