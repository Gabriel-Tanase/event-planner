/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const nextConfig = nextTranslate({
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.API_URL,
  },
});

module.exports = nextConfig;
