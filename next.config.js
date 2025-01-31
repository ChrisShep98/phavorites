/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PHISH_KEY: process.env.PHISH_KEY,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    PHAVORITES_EXPRESS: process.env.PHAVORITES_EXPRESS,
  },
};

module.exports = nextConfig;
