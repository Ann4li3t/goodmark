/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN],
  },
  env: {
    NEXT_PUBLIC_GRAPHQL_DOMAIN: process.env.NEXT_PUBLIC_GRAPHQL_DOMAIN
  }
};

module.exports = nextConfig;
