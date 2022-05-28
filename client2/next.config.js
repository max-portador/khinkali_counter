/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    path: './assets'
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },

}

module.exports = nextConfig
