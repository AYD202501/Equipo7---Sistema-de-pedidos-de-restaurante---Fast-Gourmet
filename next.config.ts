import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.auth0.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com/**',
        port: '',
      }
    ],
  },
}

export default nextConfig