"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Assuming Button is a shadcn component
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
        <nav className="p-4 bg-white dark:bg-black border-b border-neutral-200 dark:border-white/[0.2] shadow">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="text-xl font-bold">
                        Game Finder
                    </Link>
                    <Link href="/about">
                        <Button variant="ghost">About Us</Button>
                    </Link>
                    <Link href="/contact">
                        <Button variant="ghost">Contact</Button>
                    </Link>
                    <Link href="/games">
                        <Button variant="ghost">Games</Button>
                    </Link>
                    <Link href="/create-game">
                        <Button variant="ghost">Create Games</Button>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-neutral-600 dark:text-white">
                                Welcome, {user.username}!
                            </span>
                            <Button onClick={handleLogout} variant="destructive">
                                Logout
                            </Button>
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

