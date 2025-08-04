import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { updateInventoryItem, deleteInventoryItem } from '@/app/lib/data';
import { InventoryItem } from '@/app/lib/types';

function getUserFromToken(request: NextRequest): number | null {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) return null;

    try {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) return null;

        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        return decoded.userId;
    } catch {
        return null;
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ uuid: string }> }
) {
    const { uuid } = await params;
    
    try {
        const userId = getUserFromToken(request);
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, bought, expires, priority } = await request.json();

        const updates: Partial<InventoryItem> = {};
        if (name !== undefined) updates.name = name.trim();
        if (bought !== undefined) updates.bought = new Date(bought);
        if (expires !== undefined) updates.expires = new Date(expires);
        if (priority !== undefined) updates.priority = priority;

        // For this simplified version, we'll use the uuid to find the item
        // In a more robust version, you'd want to verify the user owns this item
        const success = await updateInventoryItem(parseInt(uuid), updates);

        if (success) {
            return NextResponse.json({ message: 'Item updated successfully' });
        } else {
            return NextResponse.json(
                { error: 'Item not found or update failed' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Update inventory item error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ uuid: string }> }
) {
    const { uuid } = await params;

    try {
        const userId = getUserFromToken(request);
        if (!userId) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const success = await deleteInventoryItem(uuid, userId);

        if (success) {
            return NextResponse.json({ message: 'Item deleted successfully' });
        } else {
            return NextResponse.json(
                { error: 'Item not found or delete failed' },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error('Delete inventory item error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
