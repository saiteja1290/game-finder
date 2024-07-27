'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function CreateGame() {
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const [totalPlayers, setTotalPlayers] = useState('');
    const router = useRouter();

    const handleCreateGame = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/games', { location, date, price, totalPlayers }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            router.push('/games');
        } catch (error) {
            console.error('Failed to create game:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10">
            <h1 className="text-2xl font-bold mb-5">Create Game</h1>
            <form onSubmit={handleCreateGame}>
                <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="number"
                    placeholder="Total Players"
                    value={totalPlayers}
                    onChange={(e) => setTotalPlayers(e.target.value)}
                    className="mb-3"
                />
                <Button type="submit">Create Game</Button>
            </form>
        </div>
    );
}