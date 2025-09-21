/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  // Configure for Render deployment
  experimental: {
    serverComponentsExternalPackages: [],
  },
}

module.exports = nextConfig