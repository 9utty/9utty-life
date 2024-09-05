/**
 * eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */

// eslint-disable-next-line no-undef
const path = require('path')

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
      ...config.resolve.alias,
      '@emotion/react': path.resolve('./node_modules/@emotion/react'),
      '@emotion/styled': path.resolve('./node_modules/@emotion/styled')
    }

    return config
  }
}
