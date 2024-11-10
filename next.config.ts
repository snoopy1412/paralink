import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  optimizeFonts: true,
  images: {
    domains: ['gcs.subscan.io', 'media-resources.subwallet.app']
  }
};

export default nextConfig;
