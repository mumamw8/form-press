/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [],
  },
  compiler: {
    styledComponents: true,
  }
}

export default nextConfig
