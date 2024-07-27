'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            localStorage.setItem('token', response.data.token);
            router.push('/games');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10">
            <h1 className="text-2xl font-bold mb-5">Login</h1>
            <form onSubmit={handleLogin}>
                <Input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mb-3"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-3"
                />
                <Button type="submit">Login</Button>
            </form>
        </div>
    );
}