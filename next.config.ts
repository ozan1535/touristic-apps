import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https", // Ensure to specify the protocol (http or https)
        hostname: "mrrbnlyzarlmpgoecodq.supabase.co",
      },
    ],
  },
};

export default nextConfig;
