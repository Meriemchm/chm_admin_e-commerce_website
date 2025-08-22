import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com", // Cloudinary for image uploads
    ],
  },
};

export default nextConfig;
