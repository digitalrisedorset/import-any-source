/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
// for styled-components@6 and newer
    styledComponents: true
  }
};

export default nextConfig;
