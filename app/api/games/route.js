import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/auth';

export async function GET(request) {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { db } = await connectToDatabase();
        const games = await db.collection('games').find().toArray();

        return NextResponse.json({ games }, { status: 200 });
    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { db } = await connectToDatabase();
        const { location, date, price, totalPlayers } = await request.json();

        const newGame = {
            location,
            date,
            price,
            totalPlayers,
            currentPlayers: 1,
            createdBy: decoded.userId,
            players: [`${decoded.userId}`],
        };

        await db.collection('games').insertOne(newGame);

        return NextResponse.json({ message: 'Game created successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error creating game:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
