import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // 로컬 이미지 사용 (public/ 폴더)
    unoptimized: false,
  },
}

export default nextConfig
