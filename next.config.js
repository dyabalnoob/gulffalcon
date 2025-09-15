/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true
  },
  trailingSlash: false,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : ''
}

export default nextConfig