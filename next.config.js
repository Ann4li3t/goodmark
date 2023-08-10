/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['goodmark.local'],
  },
  env: {
    WP_GRAPHQL_URL: 'http://goodmark.local/graphql'
  }
};

module.exports = nextConfig;
