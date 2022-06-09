/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/jpeg', 'image/png', 'image/gif'],
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },

}

module.exports = nextConfig
