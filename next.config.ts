import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.NEXT_PUBLIC_GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
