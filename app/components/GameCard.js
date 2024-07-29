import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function GameCard({ game, onJoin, onUnjoin, userJoined }) {
    const isoDateString = game.date;
    const dateOnly = isoDateString.slice(0, 10);
    return (
        <Card>
            <CardHeader>
                <CardTitle>{game.location}</CardTitle>
                <CardDescription>{dateOnly}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Price: {game.price}/-</p>
                <p>Players: {game.currentPlayers}/{game.totalPlayers}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                {userJoined ? (
                    <Button onClick={() => onUnjoin(game._id.toString())}>Unjoin</Button>
                ) : (

                    <Button onClick={() => onJoin(game._id.toString())}>Join Game</Button>
                )}
                <Link href={`/games/${game._id}`}>
                    <Button variant="outline">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
