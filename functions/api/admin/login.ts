import { SignJWT } from 'jose';

interface Env {
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  JWT_SECRET?: string;
  ENVIRONMENT?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  try {
    const { username, password } = await request.json() as any;

    const validUsername = env.ADMIN_USERNAME;
    const validPassword = env.ADMIN_PASSWORD;

    if (!validUsername || !validPassword) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), { status: 500 });
    }

    if (username === validUsername && password === validPassword) {
      const secret = new TextEncoder().encode(env.JWT_SECRET || 'fallback_secret_key');
      
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

      const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `admin_session=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax${env.ENVIRONMENT === 'production' ? '; Secure' : ''}`,
        }
      });

      return response;
    }

    return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
