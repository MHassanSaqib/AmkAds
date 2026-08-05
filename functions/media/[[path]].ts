/// <reference types="@cloudflare/workers-types" />

export interface Env {
  MEDIA_BUCKET: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, params } = context;
  const pathArray = params.path as string[] | undefined;
  
  if (!pathArray || pathArray.length === 0) {
    return new Response('Not Found', { status: 404 });
  }

  const path = pathArray.join('/');
  const object = await env.MEDIA_BUCKET.get(path);
  
  if (object === null) {
    return new Response('Not Found', { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  
  return new Response(object.body as any, { headers });
};
