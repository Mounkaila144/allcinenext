/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mouhtada.ptr-niger.com',
        // hostname: '127.0.0.1',
        // port:'8000',
        pathname: '/storage/**',
      },
    ],
  },

}
