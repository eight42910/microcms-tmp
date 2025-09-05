import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ワークスペースルートを明示的に指定して警告を解決
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
