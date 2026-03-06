import type { Metadata } from 'next'
import Link from 'next/link'
import type { Artwork } from '@/types/artwork'
import silverData from '@/data/silver-artworks.json'
import ArtworkGrid from '@/components/collection/ArtworkGrid'

export const metadata: Metadata = {
  title: 'Silver Jewelry Collection',
  description: '실버 스톤세팅 주얼리 컬렉션',
}

const artworks = silverData as Artwork[]

export default function SilverCollectionPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* 헤더 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">Collection</p>
          <h1 className="font-display text-4xl font-light text-stone-800">
            Silver Jewelry
          </h1>
        </div>
        {/* 탭 스위처 */}
        <div className="flex items-center gap-1 border border-stone-200 rounded-sm p-1 self-start md:self-auto">
          <span className="px-4 py-1.5 text-xs tracking-widest uppercase bg-stone-800 text-white rounded-sm">
            Silver
          </span>
          <Link
            href="/collection/chilbo"
            className="px-4 py-1.5 text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors"
          >
            Chilbo
          </Link>
        </div>
      </div>

      {/* 작품 그리드 */}
      <ArtworkGrid artworks={artworks} category="silver" />
    </div>
  )
}
