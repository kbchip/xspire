import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getUserById } from '@/app/lib/data';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;
        
        if (!token) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 401 }
            );
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        const user = await getUserById(decoded.userId);

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Auth check error:', error);
        return NextResponse.json(
            { error: 'Invalid token' },
            { status: 401 }
        );
    }
}
