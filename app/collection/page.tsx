import { redirect } from 'next/navigation'

// /collection → /collection/silver 로 리다이렉트
export default function CollectionPage() {
  redirect('/collection/silver')
}
