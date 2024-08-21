import withLess from "next-with-less";

/** @type {import('next').NextConfig} */
const nextConfig = withLess({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.extensions.push(".mjs");
    return config;
  },
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "@primary-color": "#b2d235",
        "@link-color": "#1DA57A",
        "@border-radius-base": "8px",
        "@font-size-base": "16px",
      },
      javascriptEnabled: true,
    },
  },
});

export default nextConfig;
