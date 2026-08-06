export const onRequestPost: PagesFunction = async () => {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`,
    }
  });
}
