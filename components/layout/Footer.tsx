import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-stone-100 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm text-stone-400 tracking-widest uppercase">
          Studio · Silver &amp; Enamel
        </span>
        <div className="flex gap-6">
          <Link href="/collection" className="text-xs text-stone-400 hover:text-stone-700 tracking-widest uppercase transition-colors">
            Collection
          </Link>
          <Link href="/custom-order" className="text-xs text-stone-400 hover:text-stone-700 tracking-widest uppercase transition-colors">
            Custom Order
          </Link>
          <Link href="/contact" className="text-xs text-stone-400 hover:text-stone-700 tracking-widest uppercase transition-colors">
            Contact
          </Link>
        </div>
        <p className="text-xs text-stone-300">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
