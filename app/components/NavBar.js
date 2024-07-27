'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function NavBar() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
            // Decode the token to get user information
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setUser({ username: decodedToken.username });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">Game Finder</Link>
                <div className="space-x-4 flex items-center">
                    {user ? (
                        <>
                            <Link href="/games">
                                <Button variant="ghost">Games</Button>
                            </Link>
                            <Link href="/create-game">
                                <Button variant="ghost">Create Game</Button>
                            </Link>
                            <span className="mr-4 font-bold">{user.username}</span>
                            <Button onClick={handleLogout} variant="destructive">Logout</Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button>Log in</Button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}