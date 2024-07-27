import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export async function GET(request, { params }) {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const { db } = await connectToDatabase();

        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Invalid game ID' }, { status: 400 });
        }

        const gameId = new ObjectId(id);

        const game = await db.collection('games').findOne({ _id: gameId });
        if (!game) {
            return NextResponse.json({ error: 'Game not found' }, { status: 404 });
        }

        // Fetch player details
        const playerIds = game.players ? game.players.map(id => new ObjectId(id)) : [];
        const players = await db.collection('users').find({ _id: { $in: playerIds } }).project({ username: 1 }).toArray();

        return NextResponse.json({ game, players }, { status: 200 });
    } catch (error) {
        console.error('Error fetching game details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}