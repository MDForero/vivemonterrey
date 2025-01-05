/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    images: {
        unoptimized:true,
    },
    experimental: {
        serverActions: {
          bodySizeLimit: '200mb',
        },
      },
};

export default nextConfig;
