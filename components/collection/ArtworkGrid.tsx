import type { Artwork, ArtworkCategory } from '@/types/artwork'
import ArtworkCard from './ArtworkCard'

interface ArtworkGridProps {
  artworks: Artwork[]
  category: ArtworkCategory
}

export default function ArtworkGrid({ artworks, category }: ArtworkGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="text-center py-24 text-stone-300 text-sm tracking-widest uppercase">
        작품을 준비 중입니다
      </div>
    )
  }

  return (
    <div className="masonry-grid">
      {artworks
        .filter(a => a.category === category)
        .map(artwork => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
    </div>
  )
}
