/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/",
      },
    ];
  },
};
