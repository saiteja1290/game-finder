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

        // Returning games wrapped in an object
        return NextResponse.json({ games }, { status: 200 });
    } catch (error) {
        console.error('Error fetching games:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
