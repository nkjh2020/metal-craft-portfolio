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
    <Link href={href} className="artwork-card masonry-item block relative group overflow-hidden rounded-sm">
      <div className="relative w-full">
        {/* 이미지 or 플레이스홀더 */}
        <div className="relative w-full bg-stone-100 flex items-center justify-center" style={{ minHeight: '220px' }}>
          {!imgError ? (
            <Image
              src={artwork.images.main}
              alt={artwork.title}
              width={600}
              height={800}
              className="w-full h-auto object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full flex items-center justify-center text-stone-300 text-xs tracking-wider py-20">
              {artwork.title}
            </div>
          )}
        </div>

        {/* 호버 오버레이 */}
        <div className="artwork-card-overlay">
          <span className="font-display italic text-base leading-tight">{artwork.title}</span>
        </div>
      </div>
    </Link>
  )
}
