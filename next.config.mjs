/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oirqwnbtxkeuhhegsnkd.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/images/**",
      },
      {
        protocol: "https",
        hostname: "oirqwnbtxkeuhhegsnkd.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/avatars/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: '/**',
      },

    ],
  },
};

export default nextConfig;
