'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/collection', label: 'Collection' },
  { href: '/custom-order', label: 'Custom Order' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-stone-100">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-widest text-stone-800 uppercase"
        >
          Studio
        </Link>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-xs tracking-widest uppercase transition-colors duration-200 ${
                  isActive(href)
                    ? 'text-stone-900 border-b border-stone-900 pb-0.5'
                    : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span className={`block w-5 h-px bg-stone-700 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-stone-700 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-stone-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t border-stone-100 py-4">
          <ul className="flex flex-col">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-6 py-3 text-xs tracking-widest uppercase ${
                    isActive(href) ? 'text-stone-900' : 'text-stone-400'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
