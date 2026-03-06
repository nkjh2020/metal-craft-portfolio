export type ArtworkCategory = 'silver' | 'chilbo'

export interface Artwork {
  id: string
  category: ArtworkCategory
  title: string
  concept: string
  material: string
  technique: string
  collection: string
  exhibition: string
  images: {
    main: string
    angles: string[]
  }
  year: number
  featured?: boolean
}
