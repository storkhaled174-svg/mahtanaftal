import { NextRequest, NextResponse } from 'next/server';
import { parseToken } from './src/backend/action_utils';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('naftal_admin')?.value;
  let identity = null;
  try { identity = token ? await parseToken(token) : null; } catch { /* fail closed */ }
  if (identity?.role !== 'ADMIN') {
    const login = new URL('/adminlogin/', request.url);
    login.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}
export const config = { matcher: ['/admindashboard/:path*', '/adminstockmanagement/:path*', '/admincontentsupport/:path*', '/adminregister/:path*'] };
