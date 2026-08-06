import { jwtVerify } from 'jose';

interface Env {
  JWT_SECRET?: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Paths that require authentication
  const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isProtectedApiRoute = pathname.startsWith('/api/portfolio') && ['POST', 'PUT', 'DELETE'].includes(request.method);

  if (isAdminRoute || isProtectedApiRoute) {
    const cookieString = request.headers.get('Cookie') || '';
    const match = cookieString.match(/(?:^|;\s*)admin_session=([^;]*)/);
    const token = match ? match[1] : null;

    if (!token) {
      if (isAdminRoute) {
        return Response.redirect(new URL('/admin/login', request.url).toString(), 302);
      }
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    try {
      const secret = new TextEncoder().encode(env.JWT_SECRET || 'fallback_secret_key');
      await jwtVerify(token, secret);
      // Valid token, proceed
      return next();
    } catch (error) {
      console.error("JWT Verification failed:", error);
      if (isAdminRoute) {
        return Response.redirect(new URL('/admin/login', request.url).toString(), 302);
      }
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }
  }

  return next();
}
