// middleware.ts (or /pages/_middleware.ts if older Next.js version)
import { NextResponse } from 'next/server';

export function middleware(req:any) {
  const userCookie = req.cookies.user;

  if (!userCookie) {
    // If user is not authenticated, redirect to the login page
    return NextResponse.redirect('/signin');
  }

  // If the user is authenticated, continue
  return NextResponse.next();
}
