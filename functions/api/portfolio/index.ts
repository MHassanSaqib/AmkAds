/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM PortfolioMedia ORDER BY displayOrder DESC, created_at DESC"
    ).all();

    return Response.json(results);
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const brand = formData.get('brand') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const imageSrc = formData.get('imageSrc') as string;
    const altText = formData.get('altText') as string;
    const displayOrder = parseInt(formData.get('displayOrder') as string) || 0;
    const isFeatured = formData.get('isFeatured') === 'true' ? 1 : 0;

    if (!id || !title || !brand || !type || !description) {
       return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    if (!imageSrc) {
       return new Response(JSON.stringify({ error: "Image data (imageSrc) is required" }), { status: 400 });
    }

    await env.DB.prepare(
      "INSERT INTO PortfolioMedia (id, title, brand, type, imageSrc, description, location, altText, displayOrder, isFeatured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(id, title, brand, type, imageSrc, description, location || null, altText || null, displayOrder, isFeatured).run();

    return Response.json({ success: true, id, imageSrc });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
