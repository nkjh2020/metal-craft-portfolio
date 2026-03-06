'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Artwork } from '@/types/artwork'

interface ArtworkCardProps {
  artwork: Artwork
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const href = `/collection/${artwork.category}/${artwork.id}`
  const [imgError, setImgError] = useState(false)

  return (
    <Link
      href={href}
      className="artwork-card masonry-item block relative group overflow-hidden rounded-sm bg-stone-50"
    >
      {/* 이미지: 자연 비율 그대로 표시 (masonry 효과) */}
      {!imgError ? (
        <div className="relative overflow-hidden">
          <Image
            src={artwork.images.main}
            alt={artwork.title}
            width={800}
            height={1000}
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
            onError={() => setImgError(true)}
          />
          {/* 호버 오버레이: 하단 그라데이션 */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-stone-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
            <span className="font-display italic text-white text-sm md:text-base leading-tight translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
              {artwork.title}
            </span>
          </div>
        </div>
      ) : (
        /* 이미지 로드 실패 플레이스홀더 */
        <div className="w-full aspect-[3/4] flex flex-col items-center justify-center bg-stone-100 text-stone-300 gap-2 p-4">
          <div className="w-8 h-8 rounded-full border border-stone-200" />
          <span className="text-xs tracking-wider text-center">{artwork.title}</span>
        </div>
      )}
    </Link>
  )
}
