import type { NextConfig } from 'next';
import i18nConfig from './next-i18next.config';

const nextConfig= {
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
  },
  i18n: i18nConfig.i18n,
  experimental: {
    appDir: true,
    runtime: 'edge',
  },

};

export default nextConfig;
