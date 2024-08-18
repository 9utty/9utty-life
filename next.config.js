/**
 * @format
 * @type {import('next').NextConfig}
 */

// Remove this if you're not using Fullcalendar features

// eslint-disable-next-line no-undef
module.exports = {
  output: 'standalone',
  trailingSlash: false,
  reactStrictMode: true,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias
    }

    return config
  }
}
