import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export async function POST(request, { params }) {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const { db } = await connectToDatabase();

        // Check if the id is a valid ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid game ID' }, { status: 400 });
        }

        const gameId = new ObjectId(id);

        const game = await db.collection('games').findOne({ _id: gameId });
        if (!game) {
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }

        if (game.currentPlayers >= game.totalPlayers) {
            return NextResponse.json({ error: 'Game is full' }, { status: 400 });
        }

        // Check if the user has already joined the game
        if (game.players && game.players.includes(decoded.userId)) {
            return NextResponse.json({ error: 'You have already joined this game' }, { status: 400 });
        }

        const result = await db.collection('games').updateOne(
            { _id: gameId },
            {
                $inc: { currentPlayers: 1 },
                $addToSet: { players: decoded.userId }
            }
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: 'Failed to join the game' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Joined game successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error joining game:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}