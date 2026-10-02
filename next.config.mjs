/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Catálogo público de Isis: lo leen las landings de cada propiedad (subdominios).
  async headers() {
    const cors = [{ key: 'Access-Control-Allow-Origin', value: '*' }]
    return [
      { source: '/isis-catalog', headers: cors },
      { source: '/isis-catalog-json', headers: cors },
    ]
  },
}

export default nextConfig
