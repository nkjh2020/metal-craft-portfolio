import Link from 'next/link'
import Image from 'next/image'
import type { Artwork } from '@/types/artwork'
import silverData from '@/data/silver-artworks.json'
import chilboData from '@/data/chilbo-artworks.json'

const allArtworks: Artwork[] = [
  ...(silverData as Artwork[]),
  ...(chilboData as Artwork[]),
]
const featured = allArtworks.filter(a => a.featured)

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-stone-100">
        {/* 배경: 첫 번째 featured 작품 이미지 */}
        {featured[0] && (
          <Image
            src={featured[0].images.main}
            alt="Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="relative z-10 text-center px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-stone-500 mb-4">
            Metal Craft Studio
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-light text-stone-800 leading-tight mb-6">
            Silver &amp;<br />
            <em>Enamel</em>
          </h1>
          <p className="text-sm text-stone-500 font-light tracking-wider mb-10 max-w-xs mx-auto">
            실버 스톤세팅 주얼리와<br />칠보 금속 오브제
          </p>
          <Link
            href="/collection"
            className="inline-block border border-stone-700 text-stone-700 text-xs tracking-widest uppercase px-8 py-3.5 hover:bg-stone-700 hover:text-white transition-all duration-300"
          >
            Collection
          </Link>
        </div>
      </section>

      {/* Featured Works */}
      {featured.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-2xl font-light text-stone-800">
              Featured Works
            </h2>
            <Link
              href="/collection"
              className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-700 transition-colors"
            >
              All Works →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.slice(0, 3).map(artwork => (
              <Link
                key={artwork.id}
                href={`/collection/${artwork.category}/${artwork.id}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden rounded-sm mb-3">
                  <Image
                    src={artwork.images.main}
                    alt={artwork.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-all duration-300" />
                </div>
                <p className="font-display text-base text-stone-800">{artwork.title}</p>
                <p className="text-xs text-stone-400 tracking-wider uppercase mt-0.5">
                  {artwork.category === 'silver' ? 'Silver Jewelry' : 'Chilbo Enamel'} · {artwork.year}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/collection/silver" className="group relative h-64 bg-stone-100 overflow-hidden rounded-sm flex items-end p-8">
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-1">Collection</p>
              <h3 className="font-display text-2xl text-white font-light">Silver Jewelry</h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-800/60 to-transparent" />
          </Link>
          <Link href="/collection/chilbo" className="group relative h-64 bg-stone-200 overflow-hidden rounded-sm flex items-end p-8">
            <div className="relative z-10">
              <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-1">Collection</p>
              <h3 className="font-display text-2xl text-white font-light">Chilbo Enamel</h3>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-800/60 to-transparent" />
          </Link>
        </div>
      </section>
    </>
  )
}
