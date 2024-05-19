/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PHISH_KEY: process.env.PHISH_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    PHISH_NET_API_KEY: process.env.PHISH_NET_API_KEY,
  },
};

module.exports = nextConfig;
