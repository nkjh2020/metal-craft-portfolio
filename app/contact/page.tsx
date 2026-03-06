import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact',
  description: '연락처 — 인스타그램, 이메일',
}

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Get in Touch</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-stone-800">
          Contact
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* 연락처 정보 */}
        <div className="space-y-8">
          {/* Instagram */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Instagram</p>
            <a
              href="https://instagram.com/your.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-700 hover:text-stone-900 transition-colors text-sm"
            >
              @your.studio
            </a>
          </div>

          {/* Email */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Email</p>
            <a
              href="mailto:studio@email.com"
              className="text-stone-700 hover:text-stone-900 transition-colors text-sm"
            >
              studio@email.com
            </a>
          </div>

          {/* 위치 (선택) */}
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Studio</p>
            <p className="text-sm text-stone-600 font-light">서울특별시</p>
          </div>

          {/* 운영 정보 */}
          <div className="pt-6 border-t border-stone-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-400 tracking-wider text-xs uppercase">Commission</span>
              <span className="text-green-600 text-xs">Open</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-400 tracking-wider text-xs uppercase">Response Time</span>
              <span className="text-stone-600 text-xs">1~3 영업일</span>
            </div>
          </div>
        </div>

        {/* Custom Order 유도 */}
        <div className="bg-stone-50 rounded-sm p-8 flex flex-col justify-between h-fit">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Bespoke</p>
            <h2 className="font-display text-2xl font-light text-stone-800 mb-3">
              Custom Order
            </h2>
            <p className="text-sm text-stone-500 font-light leading-relaxed">
              당신만의 이야기를 담은 작품을 제작합니다.
              실버 주얼리, 칠보 오브제 맞춤 제작 문의는 아래 버튼을 이용해 주세요.
            </p>
          </div>
          <Link
            href="/custom-order"
            className="inline-block text-center border border-stone-700 text-stone-700 text-xs tracking-widest uppercase px-6 py-3 hover:bg-stone-700 hover:text-white transition-all duration-300"
          >
            Custom Order →
          </Link>
        </div>
      </div>
    </div>
  )
}
