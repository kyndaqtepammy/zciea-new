/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.zciea.trade', 'localhost'],
  },
};

module.exports = withPWA(nextConfig);
