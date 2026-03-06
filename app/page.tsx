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
      {/* ── Hero ─────────────────────────────────── */}
      <section className="hero-nature-bg min-h-[92vh] flex items-stretch overflow-hidden">
        {/* 왼쪽: 텍스트 */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-20 z-10">
          <p className="text-[10px] tracking-[0.45em] uppercase text-stone-400 mb-5">
            Metal Craft Studio
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-stone-700 leading-[1.15] mb-6">
            Silver<br />
            <em className="text-stone-500">&amp; Enamel</em>
          </h1>
          <p className="text-sm text-stone-500 font-light leading-relaxed mb-10 max-w-[260px]">
            실버 스톤세팅 주얼리와<br />
            칠보 금속 오브제를 만듭니다
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              href="/collection/silver"
              className="text-xs tracking-widest uppercase px-7 py-3 border border-stone-400 text-stone-600 hover:border-stone-600 hover:text-stone-800 transition-all duration-300"
            >
              Silver
            </Link>
            <Link
              href="/collection/chilbo"
              className="text-xs tracking-widest uppercase px-7 py-3 bg-stone-600 text-stone-100 hover:bg-stone-700 transition-all duration-300"
            >
              Chilbo
            </Link>
          </div>
        </div>

        {/* 오른쪽: 대표 이미지 콜라주 */}
        <div className="hidden md:flex flex-1 items-center justify-center p-8 lg:p-12 gap-3">
          {/* 세로 2장 + 가로 1장 배치 */}
          <div className="flex flex-col gap-3 w-44 lg:w-52">
            {featured[0] && (
              <div className="relative overflow-hidden rounded-sm bg-stone-200 aspect-[3/4]">
                <Image
                  src={featured[0].images.main}
                  alt={featured[0].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            {featured[2] && (
              <div className="relative overflow-hidden rounded-sm bg-stone-200 aspect-[4/3]">
                <Image
                  src={featured[2].images.main}
                  alt={featured[2].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 w-36 lg:w-44 mt-10">
            {featured[1] && (
              <div className="relative overflow-hidden rounded-sm bg-stone-200 aspect-[3/4]">
                <Image
                  src={featured[1].images.main}
                  alt={featured[1].title}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            )}
            {featured[3] && (
              <div className="relative overflow-hidden rounded-sm bg-stone-200 aspect-square">
                <Image
                  src={featured[3].images.main}
                  alt={featured[3].title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Featured Works ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-2">Selected</p>
            <h2 className="font-display text-2xl md:text-3xl font-light text-stone-700">
              Featured Works
            </h2>
          </div>
          <Link
            href="/collection"
            className="text-[11px] tracking-widest uppercase text-stone-400 hover:text-stone-600 transition-colors pb-0.5 border-b border-transparent hover:border-stone-400"
          >
            All Works →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {featured.map((artwork, i) => (
            <Link
              key={artwork.id}
              href={`/collection/${artwork.category}/${artwork.id}`}
              className="group block"
            >
              <div className={`relative bg-stone-100 overflow-hidden rounded-sm mb-2.5 ${
                i === 0 ? 'aspect-[3/4]' :
                i === 1 ? 'aspect-square' :
                i === 2 ? 'aspect-[4/5]' : 'aspect-[3/4]'
              }`}>
                <Image
                  src={artwork.images.main}
                  alt={artwork.title}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/15 transition-all duration-300" />
              </div>
              <p className="font-display text-sm text-stone-700 leading-tight">{artwork.title}</p>
              <p className="text-[10px] text-stone-400 tracking-wider uppercase mt-0.5">
                {artwork.category === 'silver' ? 'Silver' : 'Chilbo'}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Studio Quote ─────────────────────────── */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #E8E3D8 0%, #DDD7CB 100%)' }}
      >
        {/* 배경: 칠보 모빌 이미지 — 흐릿하게 */}
        <Image
          src="/images/chilbo/IMG_3416.jpeg"
          alt=""
          fill
          className="object-cover opacity-[0.12] mix-blend-multiply"
          aria-hidden
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="font-display text-2xl md:text-3xl font-light text-stone-600 leading-relaxed italic mb-6">
            "금속이 품은 이야기를<br />꺼내는 작업을 합니다"
          </p>
          <Link
            href="/about"
            className="text-[11px] tracking-widest uppercase text-stone-500 hover:text-stone-700 border-b border-stone-400 pb-0.5 transition-colors"
          >
            About the Artist →
          </Link>
        </div>
      </section>

      {/* ── Category Sections ────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Silver */}
          <Link href="/collection/silver" className="category-card group h-72 md:h-80 block">
            <div className="absolute inset-0 bg-stone-200 overflow-hidden rounded-sm">
              <Image
                src="/images/silver/24316.jpeg"
                alt="Silver Jewelry Collection"
                fill
                className="object-cover category-card-img transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-800/55 via-stone-800/10 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-7 z-10">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/60 mb-1.5">Collection</p>
              <h3 className="font-display text-2xl md:text-3xl text-white font-light">
                Silver Jewelry
              </h3>
              <p className="text-xs text-white/50 mt-2 tracking-wider">
                Stone Setting · Hand Fabrication
              </p>
            </div>
          </Link>

          {/* Chilbo */}
          <Link href="/collection/chilbo" className="category-card group h-72 md:h-80 block">
            <div className="absolute inset-0 bg-stone-300 overflow-hidden rounded-sm">
              <Image
                src="/images/chilbo/21801.jpeg"
                alt="Chilbo Enamel Collection"
                fill
                className="object-cover object-center category-card-img transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-700/50 via-stone-700/5 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-7 z-10">
              <p className="text-[10px] tracking-[0.35em] uppercase text-white/60 mb-1.5">Collection</p>
              <h3 className="font-display text-2xl md:text-3xl text-white font-light">
                Chilbo Enamel
              </h3>
              <p className="text-xs text-white/50 mt-2 tracking-wider">
                Frame · Mobile · Object
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Custom Order CTA ─────────────────────── */}
      <section className="border-t border-stone-200 py-16 px-6 text-center"
        style={{ background: '#F0EBE2' }}>
        <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-3">Bespoke</p>
        <h2 className="font-display text-2xl md:text-3xl font-light text-stone-700 mb-3">
          Custom Order
        </h2>
        <p className="text-sm text-stone-500 font-light mb-8 max-w-sm mx-auto leading-relaxed">
          당신의 이야기를 담은<br />세상에 하나뿐인 작품을 만들어드립니다
        </p>
        <Link
          href="/custom-order"
          className="inline-block text-xs tracking-widest uppercase px-8 py-3.5 border border-stone-500 text-stone-600 hover:bg-stone-600 hover:text-white transition-all duration-300"
        >
          문의하기
        </Link>
      </section>
    </>
  )
}
