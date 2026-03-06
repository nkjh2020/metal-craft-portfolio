'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PhotoStripProps {
  images: string[]        // 보조 사진 배열 (3~4개)
  mainImage: string       // 대표 사진 (비교 위해)
  selectedImage: string   // 현재 선택된 사진
  onSelect: (src: string) => void
}

function ThumbImage({ src, index }: { src: string; index: number }) {
  const [error, setError] = useState(false)
  return (
    <>
      {!error ? (
        <Image
          src={src}
          alt={`작품 사진 ${index + 1}`}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-stone-100 flex items-center justify-center text-stone-300 text-xs">
          {index + 1}
        </div>
      )}
    </>
  )
}

export default function PhotoStrip({
  images,
  mainImage,
  selectedImage,
  onSelect,
}: PhotoStripProps) {
  // 대표 사진 + 보조 사진 모두 스트립에 포함
  const allImages = [mainImage, ...images]

  return (
    <div className="flex flex-row gap-2 mt-3">
      {allImages.map((src, i) => (
        <button
          key={i}
          onClick={() => onSelect(src)}
          className={`photo-strip-item flex-shrink-0 w-16 h-16 md:w-20 md:h-20 relative rounded ${
            selectedImage === src ? 'selected' : ''
          }`}
          aria-label={`사진 ${i + 1} 보기`}
        >
          <ThumbImage src={src} index={i} />
        </button>
      ))}
    </div>
  )
}
