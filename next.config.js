/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aykutaskeri.de',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'wp.aykutaskeri.de',
        pathname: '/wp-content/**',
      },
    ],
  },
}

module.exports = nextConfig
