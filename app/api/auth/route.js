import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ success: false, error: "Email and password are required." }), { status: 400 });
    }
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials." }), { status: 401 });
    }
    // For development: plain text password check
    if (admin.password !== password) {
      return new Response(JSON.stringify({ success: false, error: "Invalid credentials." }), { status: 401 });
    }
    // Set a cookie for admin authentication
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', 'authenticated', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      // secure: true, // Uncomment if using HTTPS
      maxAge: 60 * 60 * 2 // 2 hours
    });
    return response;
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
