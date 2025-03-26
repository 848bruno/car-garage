/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  },
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone'
};

module.exports = nextConfig;