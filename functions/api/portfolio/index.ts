/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM PortfolioMedia ORDER BY created_at DESC"
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
    const imageFile = formData.get('image') as File | null;
    let imageSrc = formData.get('imageSrc') as string;

    if (!id || !title || !brand || !type || !description) {
       return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    if (imageFile && typeof imageFile !== 'string') {
      const fileName = `${id}-${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      await env.MEDIA_BUCKET.put(fileName, await imageFile.arrayBuffer(), {
         httpMetadata: { contentType: imageFile.type }
      });
      imageSrc = `/media/${fileName}`;
    }

    if (!imageSrc) {
       return new Response(JSON.stringify({ error: "Image is required" }), { status: 400 });
    }

    await env.DB.prepare(
      "INSERT INTO PortfolioMedia (id, title, brand, type, imageSrc, description, location) VALUES (?, ?, ?, ?, ?, ?, ?)"
    ).bind(id, title, brand, type, imageSrc, description, location || null).run();

    return Response.json({ success: true, id, imageSrc });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
