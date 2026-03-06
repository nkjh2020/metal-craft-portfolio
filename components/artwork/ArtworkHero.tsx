'use client'

import Image from 'next/image'
import { useState } from 'react'
import PhotoStrip from './PhotoStrip'

interface ArtworkHeroProps {
  mainImage: string
  angles: string[]
  title: string
}

export default function ArtworkHero({ mainImage, angles, title }: ArtworkHeroProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage)
  const [imgError, setImgError] = useState(false)

  // 사진 변경 시 에러 상태 리셋
  const handleSelect = (src: string) => {
    setSelectedImage(src)
    setImgError(false)
  }

  return (
    <div className="w-full">
      {/* 대표 사진 (대형) */}
      <div className="relative w-full bg-stone-100 rounded-sm overflow-hidden flex items-center justify-center" style={{ minHeight: '420px' }}>
        {!imgError ? (
          <Image
            src={selectedImage}
            alt={title}
            width={900}
            height={1100}
            className="w-full h-auto object-cover transition-opacity duration-300"
            priority
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full flex items-center justify-center text-stone-300 text-sm tracking-wider py-32">
            {title}
          </div>
        )}
      </div>

      {/* 보조 사진 스트립 */}
      {angles.length > 0 && (
        <PhotoStrip
          images={angles}
          mainImage={mainImage}
          selectedImage={selectedImage}
          onSelect={handleSelect}
        />
      )}
    </div>
  )
}
