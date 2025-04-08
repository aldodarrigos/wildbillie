/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Configurar el loader de SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
