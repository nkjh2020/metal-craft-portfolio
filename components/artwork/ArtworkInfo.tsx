import type { Artwork } from '@/types/artwork'

interface ArtworkInfoProps {
  artwork: Artwork
}

const categoryLabel = {
  silver: 'Silver Jewelry',
  chilbo: 'Chilbo Enamel',
}

const fields: { key: keyof Artwork; label: string }[] = [
  { key: 'concept', label: 'Concept' },
  { key: 'material', label: 'Material' },
  { key: 'technique', label: 'Technique' },
  { key: 'collection', label: 'Collection' },
  { key: 'exhibition', label: 'Exhibition' },
]

export default function ArtworkInfo({ artwork }: ArtworkInfoProps) {
  return (
    <div className="space-y-0">
      {/* 작품명 + 카테고리 · 연도 */}
      <div className="pb-6 border-b border-stone-100">
        <h1 className="font-display text-3xl md:text-4xl font-light text-stone-900 mb-2">
          {artwork.title}
        </h1>
        <p className="text-xs tracking-widest uppercase text-stone-400">
          {categoryLabel[artwork.category]} &middot; {artwork.year}
        </p>
      </div>

      {/* 6개 메타데이터 필드 */}
      {fields.map(({ key, label }) => {
        const value = artwork[key]
        if (!value || typeof value !== 'string') return null
        return (
          <div key={key} className="py-5 border-b border-stone-100">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-1.5">
              {label}
            </p>
            <p className="text-stone-700 font-light leading-relaxed text-sm md:text-base">
              {value}
            </p>
          </div>
        )
      })}
    </div>
  )
}
