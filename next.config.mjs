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
    ],
  },
};

export default nextConfig;
