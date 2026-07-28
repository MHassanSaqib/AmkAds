/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // Static HTML export → produces /out folder
  trailingSlash: true,    // Required for Cloudflare Pages routing
  images: {
    unoptimized: true,    // Next.js image optimization not available on static/edge
  },
}

module.exports = nextConfig
