/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Monaco Editor works only on client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    } else {
      // On server-side, ignore Monaco Editor completely
      config.resolve.alias = {
        ...config.resolve.alias,
        '@monaco-editor/react': false,
        'monaco-editor': false,
      };
    }
    
    // Handle Monaco Editor assets
    config.module.rules.push({
      test: /\.ttf$/,
      type: 'asset/resource',
    });

    return config;
  },
}

module.exports = nextConfig


