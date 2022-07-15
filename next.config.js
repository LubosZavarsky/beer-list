/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ['images.punkapi.com'],
    // custom loader has to be used if exporting static html (next export).
    // next/image elements using static (public) images as src should also have custom loader attribute e.g. loader={({src})=> src} src="/logo.png"
    //loader: 'imgix',
    //path: '',
  },
};
