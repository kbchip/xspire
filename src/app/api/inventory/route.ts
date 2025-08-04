import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getInventoryByUserId, addInventoryItem } from '@/app/lib/data';

function getUserFromToken(request: NextRequest): number | null {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return null;

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) return null;

        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        return decoded.userId;
    } catch (error) {
        return null;
    }
}

export async function GET(request: NextRequest) {
    try {
        const userId = getUserFromToken(request);
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const inventory = await getInventoryByUserId(userId);
        return NextResponse.json({ inventory });
    } catch (error) {
        console.error('Inventory fetch error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const userId = getUserFromToken(request);
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, bought, expires, priority } = await request.json();

        if (!name || !bought || !expires) {
            return NextResponse.json(
                { error: 'Name, bought date, and expiration date are required' },
                { status: 400 }
            );
        }

        const newItem = {
            user_id: userId,
            name: name.trim(),
            bought: new Date(bought),
            expires: new Date(expires),
            priority: priority || 1,
            uuid: crypto.randomUUID()
        };

        const itemId = await addInventoryItem(newItem);

        return NextResponse.json({
            message: 'Item added successfully',
            item: { ...newItem, id: itemId }
        }, { status: 201 });
    } catch (error) {
        console.error('Add inventory item error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
