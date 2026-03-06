import type { Metadata } from 'next'
import CustomOrderForm from '@/components/order/CustomOrderForm'

export const metadata: Metadata = {
  title: 'Custom Order',
  description: '맞춤 제작 주문 문의 — 실버 주얼리, 칠보 오브제',
}

export default function CustomOrderPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-14">
        <p className="text-xs tracking-widest uppercase text-stone-400 mb-3">Bespoke</p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-stone-800 mb-4">
          Custom Order
        </h1>
        <p className="text-sm text-stone-500 font-light leading-relaxed max-w-lg">
          당신만의 이야기를 담은 작품을 함께 만들어 드립니다.
          반지, 목걸이, 귀걸이 등 실버 주얼리와 칠보 오브제(액자, 모빌) 맞춤 제작이 가능합니다.
          아래 양식을 작성해 주시면 검토 후 연락드리겠습니다.
        </p>
      </div>

      <CustomOrderForm />

      {/* 안내 */}
      <div className="mt-14 pt-10 border-t border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-stone-500 font-light">
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">제작 기간</p>
          <p>작품 복잡도에 따라 4~12주 소요됩니다.</p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">상담 과정</p>
          <p>문의 접수 → 이메일 상담 → 디자인 확정 → 제작 시작</p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-400 mb-2">현재 상태</p>
          <p className="text-green-600">커미션 오픈 중</p>
        </div>
      </div>
    </div>
  )
}
