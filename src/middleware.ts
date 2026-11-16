import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/jwt';

const PUBLIC_MUTATIONS = ['/api/contact', '/api/auth'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('session')?.value;
  const session = token ? await verifyToken(token) : null;

  if (pathname.startsWith('/admin')) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname.startsWith('/api')) {
    const method = req.method.toUpperCase();
    const mutating = !['GET', 'HEAD', 'OPTIONS'].includes(method);
    if (mutating) {
      const allowed = PUBLIC_MUTATIONS.some(
        (p) => pathname === p || pathname.startsWith(p + '/'),
      );
      if (!allowed && !session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/:path*'],
};
