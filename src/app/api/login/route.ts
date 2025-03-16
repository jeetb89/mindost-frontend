import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(email: string, password: string) {
    try {
        const url = 'http://localhost:5000/auth/login';

        const response = await axios.post(url, {
            email,
            password,
            userIdType: 'user'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Login failed' }, { status: 500 });
    }
}
