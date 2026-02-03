import { useCallback, useState } from 'react'
import { loadJson, saveJson } from '../utils/storage'

const FAVORITES_KEY = 'hanzi-favorites-v1'

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set(loadJson<string[]>(FAVORITES_KEY, []))
  )

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      saveJson(FAVORITES_KEY, Array.from(next))
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (id: string) => favoriteIds.has(id),
    [favoriteIds]
  )

  return {
    favoriteIds,
    toggleFavorite,
    isFavorite
  }
}

