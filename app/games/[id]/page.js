'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GameDetails({ params }) {
    const [game, setGame] = useState(null);
    const [players, setPlayers] = useState([]);
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

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>{game.location}</CardTitle>
                    <CardDescription>Date: {game.date}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Price: {game.price}/-</p>
                    <p>Players: {game.currentPlayers}/{game.totalPlayers}</p>
                    <h3 className="mt-4 font-bold">Players:</h3>
                    <ul className="list-disc pl-5">
                        {players.map((player, index) => (
                            <li key={index}>{player.username}</li>
                        ))}
                    </ul>
                    {game.currentPlayers < game.totalPlayers && (
                        <Button onClick={handleJoinGame} className="mt-4">Join Game</Button>
                    )}
                </CardContent>
            </Card>
            <Button onClick={() => router.push('/games')} className="mt-4">Back to Games</Button>
        </div>
    );
}