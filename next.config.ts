import { withContentlayer } from "next-contentlayer2";

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
} as const;

export default withContentlayer(nextConfig);
