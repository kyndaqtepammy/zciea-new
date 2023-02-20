/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.zciea.trade", "localhost"],
  },
};

module.exports = nextConfig;
