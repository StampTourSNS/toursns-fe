import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/:path*`,
      },
      {
        source: '/user/oauth2/:path*',
        destination: `${process.env.NEXT_PUBLIC_KAKAO_LOGIN || 'https://kauth.kakao.com'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
