import { auth } from "@/lib/auth";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const requestMap = new Map<string, number[]>();

setInterval(() => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  
  requestMap.forEach((timestamps, ip) => {
    const validTimestamps = timestamps.filter(time => now - time < windowMs);
    if (validTimestamps.length === 0) {
      requestMap.delete(ip);
    } else {
      requestMap.set(ip, validTimestamps);
    }
  });
}, 15 * 60 * 1000);

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; 
  const maxRequests = 5;

  const requestHistory = requestMap.get(ip) || [];
  const windowStart = now - windowMs;
  const recentRequests = requestHistory.filter(time => time > windowStart);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  requestMap.set(ip, recentRequests);
  return true;
}

export async function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname === '/api/users') {
      const forwardedFor = request.headers.get('x-forwarded-for');
      const realIp = request.headers.get('x-real-ip');
      const ip = forwardedFor?.split(',')[0] ?? realIp ?? 'unknown';
      
      if (!checkRateLimit(ip)) {
        return new NextResponse(
          JSON.stringify({ 
            message: 'Too many registration attempts. Please try again later.',
            retryAfter: '15 minutes'
          }),
          { 
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': '900'
            }
          }
        );
      }
      return NextResponse.next();
    }

    const response = await auth();
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    "/api/register"
  ],
};