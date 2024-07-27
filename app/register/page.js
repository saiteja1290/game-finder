'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/register', { username, password, location });
            router.push('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10">
            <h1 className="text-2xl font-bold mb-5">Register</h1>
            <form onSubmit={handleRegister}>
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
                <Select onValueChange={setLocation} value={location}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                    </SelectContent>
                </Select>
                <Button type="submit" className="mt-3">Register</Button>
            </form>
        </div>
    );
}