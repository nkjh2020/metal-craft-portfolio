import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Artwork } from '@/types/artwork'
import chilboData from '@/data/chilbo-artworks.json'
import ArtworkHero from '@/components/artwork/ArtworkHero'
import ArtworkInfo from '@/components/artwork/ArtworkInfo'

const artworks = chilboData as Artwork[]

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return artworks.map(a => ({ id: a.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const artwork = artworks.find(a => a.id === id)
  if (!artwork) return { title: 'Not Found' }
  return {
    title: artwork.title,
    description: artwork.concept,
  }
}

export default async function ChilboArtworkPage({ params }: Props) {
  const { id } = await params
  const artwork = artworks.find(a => a.id === id)
  if (!artwork) notFound()

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* 뒤로가기 */}
      <Link
        href="/collection/chilbo"
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors mb-10"
      >
        ← Chilbo Enamel
      </Link>

      {/* 메인 레이아웃: 사진 | 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* 왼쪽: 사진 뷰어 */}
        <ArtworkHero
          mainImage={artwork.images.main}
          angles={artwork.images.angles}
          title={artwork.title}
        />

        {/* 오른쪽: 작품 정보 */}
        <div className="lg:pt-0">
          <ArtworkInfo artwork={artwork} />
        </div>
      </div>
    </div>
  )
}
