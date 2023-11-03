/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lucide-react"], // add this
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
