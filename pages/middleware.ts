// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Request URL:', request.url);
  console.log('Request method:', request.method);

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: '/dashboards/:path*',
};
