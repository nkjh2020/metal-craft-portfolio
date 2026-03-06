import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Studio · Metal Craft Portfolio',
    template: '%s | Studio',
  },
  description: '실버 스톤세팅 주얼리와 칠보 오브제를 만드는 금속공예 작가의 포트폴리오',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-background min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
