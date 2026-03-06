import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: '금속공예 작가 소개 - 실버 스톤세팅 주얼리와 칠보 오브제를 만듭니다.',
}

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* 상단 헤더 */}
      <div className="mb-16">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">About</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-stone-800">
          The Artist
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* 프로필 이미지 placeholder */}
        <div className="aspect-[3/4] bg-stone-100 rounded-sm flex items-center justify-center text-stone-300 text-sm tracking-wider">
          Artist Photo
        </div>

        {/* 소개 텍스트 */}
        <div className="space-y-8">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">
              작가명 / Studio Name
            </p>
            <p className="font-display text-2xl text-stone-800 font-light">
              Your Name
            </p>
          </div>

          <div className="space-y-4 text-stone-600 font-light leading-relaxed text-sm">
            <p>
              금속이 품은 이야기를 꺼내는 작업을 합니다.
              은(Silver)으로 빚은 주얼리에는 자연의 순간들을,
              칠보(Enamel)로 구운 오브제에는 빛과 색의 기억을 담습니다.
            </p>
            <p>
              스톤세팅 기법으로 원석의 고유한 아름다움을 살린 실버 주얼리와,
              유약을 구워 색을 입히는 칠보 공예로 만든 액자·모빌 등의 오브제 작품을 작업합니다.
            </p>
            <p>
              모든 작품은 핸드메이드로 제작되며,
              개인의 이야기를 담은 커스텀 주문도 받고 있습니다.
            </p>
          </div>

          {/* 이력 */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Education</p>
            <div className="text-sm text-stone-600 font-light space-y-2">
              <p>20XX 홍익대학교 금속조형디자인학과 졸업</p>
              <p>20XX 공예 전문 스튜디오 수료</p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-stone-100">
            <p className="text-xs tracking-widest uppercase text-stone-400 mb-4">Selected Exhibition</p>
            <div className="text-sm text-stone-600 font-light space-y-2">
              <p>2025 한국칠보공예대전 특선</p>
              <p>2025 서울 공예주간 기획전</p>
              <p>2024 공예트렌드페어</p>
              <p>2024 홍대 아트갤러리 그룹전</p>
            </div>
          </div>
        </div>
      </div>

      {/* 작업 방식 */}
      <div className="mt-20 pt-16 border-t border-stone-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              label: 'Silver Jewelry',
              desc: '실버 925와 원석으로 만든 주얼리. 스톤세팅과 핸드 파브리케이션으로 자연의 형태를 담습니다.',
            },
            {
              label: 'Chilbo Enamel',
              desc: '구리 위에 유리 유약을 올려 고온에서 구워내는 칠보 공예. 액자, 모빌 등의 오브제를 만듭니다.',
            },
            {
              label: 'Custom Order',
              desc: '의뢰인의 이야기를 담은 맞춤 제작 작품. 반지, 목걸이, 선물용 오브제 등을 함께 만들어갑니다.',
            },
          ].map(({ label, desc }) => (
            <div key={label}>
              <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">{label}</p>
              <p className="text-sm text-stone-600 font-light leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
