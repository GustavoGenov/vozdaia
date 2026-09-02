/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'vozdaia.vercel.app' }],
        destination: 'https://vozdaia.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'voz-da-ia.vercel.app' }],
        destination: 'https://vozdaia.com/:path*',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
