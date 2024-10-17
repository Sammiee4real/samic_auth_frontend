
/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: "",
  assetPrefix :"",
  images: {
    loader: "imgix",
    path: "/",
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/dashboards/crm', // Or any protected route
  //       has: [
  //         {
  //           type: 'cookie',
  //           key: 'user',
  //           value: '^(?!$).*$', // Check if user cookie exists
  //         },
  //       ],
  //       destination: '/',
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
