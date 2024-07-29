'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { useAuth } from '../contexts/AuthContext';
import { ModeToggle } from './ModeToggle';
export default function NavBar() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <nav className="p-4">
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
                            <span className="mr-4">Welcome, {user.username}!</span>
                            <Button onClick={handleLogout} variant="destructive">Logout</Button>
                        </>
                    ) : (
                        <Link href="/login">
                            <Button>Log in</Button>
                        </Link>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
}