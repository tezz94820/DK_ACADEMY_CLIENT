/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.canvas = false;  
    return config;
  },
  images: {
    domains: ['s3.ap-south-1.amazonaws.com'],
  },
}

module.exports = nextConfig
