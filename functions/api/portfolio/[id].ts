/// <reference types="@cloudflare/workers-types" />

export interface Env {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
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
    const imageFile = formData.get('image') as File | null;
    let imageSrc = formData.get('imageSrc') as string;

    if (!title || !brand || !type || !description) {
       return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    if (imageFile && typeof imageFile !== 'string') {
      const fileName = `${id}-${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
      await env.MEDIA_BUCKET.put(fileName, await imageFile.arrayBuffer(), {
         httpMetadata: { contentType: imageFile.type }
      });
      imageSrc = `/media/${fileName}`;
    }

    await env.DB.prepare(
      "UPDATE PortfolioMedia SET title = ?, brand = ?, type = ?, imageSrc = ?, description = ?, location = ? WHERE id = ?"
    ).bind(title, brand, type, imageSrc, description, location || null, id).run();

    return Response.json({ success: true, id, imageSrc });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  const id = params.id as string;
  
  try {
    // Optional: fetch imageSrc to delete from R2, but keeping it simple for now
    // Or we delete it if it exists.
    const record = await env.DB.prepare("SELECT imageSrc FROM PortfolioMedia WHERE id = ?").bind(id).first();
    if (record && record.imageSrc && record.imageSrc.startsWith('/media/')) {
       const fileName = record.imageSrc.replace('/media/', '');
       await env.MEDIA_BUCKET.delete(fileName);
    }

    await env.DB.prepare(
      "DELETE FROM PortfolioMedia WHERE id = ?"
    ).bind(id).run();

    return Response.json({ success: true, id });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
