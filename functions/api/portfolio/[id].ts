/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB: D1Database;
}

export const onRequestPut: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;
  const id = params.id as string;
  
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const brand = formData.get('brand') as string;
    const type = formData.get('type') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const imageSrc = formData.get('imageSrc') as string;
    const altText = formData.get('altText') as string;
    const displayOrder = parseInt(formData.get('displayOrder') as string) || 0;
    const isFeatured = formData.get('isFeatured') === 'true' ? 1 : 0;

    if (!title || !brand || !type || !description) {
       return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    if (!imageSrc) {
       return new Response(JSON.stringify({ error: "Image data (imageSrc) is required" }), { status: 400 });
    }

    await env.DB.prepare(
      "UPDATE PortfolioMedia SET title = ?, brand = ?, type = ?, imageSrc = ?, description = ?, location = ?, altText = ?, displayOrder = ?, isFeatured = ? WHERE id = ?"
    ).bind(title, brand, type, imageSrc, description, location || null, altText || null, displayOrder, isFeatured, id).run();

    return Response.json({ success: true, id, imageSrc });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  const id = params.id as string;
  
  try {
    await env.DB.prepare(
      "DELETE FROM PortfolioMedia WHERE id = ?"
    ).bind(id).run();

    return Response.json({ success: true, id });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
