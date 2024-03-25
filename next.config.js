/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias.canvas = false;  
    return config;
  },
  images: {
    domains: ['s3.ap-south-1.amazonaws.com'],
    minimumCacheTTL: 60,
  },
}

module.exports = nextConfig
