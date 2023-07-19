/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // NEXT_API_URL: 'https://smoky-admin.vercel.app',
    API_URL: 'https://fakestoreapi.com',
    NEXT_API_URL: 'http://localhost:3000',
    PER_PAGE: 10,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.pexels.com'
      },
      {
        hostname: 'fakestoreapi.com'
      },
    ],
  },
}

module.exports = nextConfig
