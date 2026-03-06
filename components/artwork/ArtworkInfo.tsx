import type { Artwork } from '@/types/artwork'

interface ArtworkInfoProps {
  artwork: Artwork
}

const categoryLabel = {
  silver: 'Silver Jewelry',
  chilbo: 'Chilbo Enamel',
}

export default function ArtworkInfo({ artwork }: ArtworkInfoProps) {
  return (
    <div className="space-y-0">
      {/* 작품명 + 카테고리 · 연도 */}
      <div className="pb-6 border-b border-stone-200">
        <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900 mb-2 leading-snug">
          {artwork.title}
        </h1>
        <p className="text-xs tracking-widest uppercase text-stone-400">
          {categoryLabel[artwork.category]} &middot; {artwork.year}
        </p>
      </div>

      {/* Concept — 줄바꿈 적용 */}
      <div className="py-5 border-b border-stone-100">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
          Concept
        </p>
        <p className="text-stone-600 font-light leading-[1.9] text-sm md:text-base whitespace-pre-line">
          {artwork.concept}
        </p>
      </div>

      {/* Material */}
      <div className="py-5 border-b border-stone-100">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">
          Material
        </p>
        <p className="text-stone-700 font-light text-sm md:text-base">
          {artwork.material}
        </p>
      </div>

      {/* Technique */}
      <div className="py-5 border-b border-stone-100">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">
          Technique
        </p>
        <p className="text-stone-700 font-light text-sm md:text-base">
          {artwork.technique}
        </p>
      </div>

      {/* Collection */}
      <div className="py-5 border-b border-stone-100">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">
          Collection
        </p>
        <p className="text-stone-700 font-light text-sm md:text-base">
          {artwork.collection}
        </p>
      </div>

      {/* Exhibition — 파이프(|) 기준 줄바꿈 */}
      <div className="py-5 border-b border-stone-100">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
          Exhibition
        </p>
        <div className="space-y-1.5">
          {artwork.exhibition.split('|').map((ex, i) => (
            <p key={i} className="text-stone-600 font-light text-sm flex items-start gap-2">
              <span className="text-stone-300 mt-0.5 flex-shrink-0">—</span>
              <span>{ex.trim()}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
