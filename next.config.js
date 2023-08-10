/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["10.10.200.140", "https://flagcdn.com"],
  },
};

module.exports = nextConfig;
