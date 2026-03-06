'use client'

import { useState } from 'react'

// Formspree 설정: https://formspree.io 에서 폼 만든 후 ID 교체
const FORMSPREE_ID = 'YOUR_FORM_ID'

export default function CustomOrderForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    artworkType: 'silver',
    desiredWork: '',
    materialPreference: '',
    budget: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', artworkType: 'silver', desiredWork: '', materialPreference: '', budget: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputClass =
    'w-full border border-stone-200 bg-transparent px-4 py-3 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-stone-500 rounded-sm transition-colors'
  const labelClass = 'block text-xs tracking-widest uppercase text-stone-400 mb-2'

  if (status === 'success') {
    return (
      <div className="text-center py-20">
        <p className="font-display text-2xl text-stone-800 mb-3">감사합니다</p>
        <p className="text-sm text-stone-500">문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>이름 *</label>
          <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="홍길동" />
        </div>
        <div>
          <label className={labelClass}>이메일 *</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="email@example.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>연락처</label>
          <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="010-0000-0000" />
        </div>
        <div>
          <label className={labelClass}>작품 유형 *</label>
          <select name="artworkType" value={form.artworkType} onChange={handleChange} required className={inputClass}>
            <option value="silver">Silver Jewelry (실버 주얼리)</option>
            <option value="chilbo">Chilbo Enamel (칠보 오브제)</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>원하시는 작품</label>
        <input name="desiredWork" value={form.desiredWork} onChange={handleChange} className={inputClass} placeholder="반지, 목걸이, 액자, 모빌 등" />
      </div>

      <div>
        <label className={labelClass}>소재 선호</label>
        <input name="materialPreference" value={form.materialPreference} onChange={handleChange} className={inputClass} placeholder="예: 문스톤, 청색 계열 칠보..." />
      </div>

      <div>
        <label className={labelClass}>예산 (선택)</label>
        <input name="budget" value={form.budget} onChange={handleChange} className={inputClass} placeholder="예: 30만원 내외" />
      </div>

      <div>
        <label className={labelClass}>상세 요청사항 *</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className={inputClass}
          placeholder="원하시는 디자인, 용도, 특별히 담고 싶은 의미 등을 자유롭게 작성해 주세요."
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-400">전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full md:w-auto px-10 py-3.5 bg-stone-800 text-white text-xs tracking-widest uppercase hover:bg-stone-700 transition-colors disabled:opacity-50 rounded-sm"
      >
        {status === 'loading' ? '전송 중...' : '문의 보내기'}
      </button>
    </form>
  )
}
