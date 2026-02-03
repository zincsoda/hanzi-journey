import { useEffect, useState } from 'react'
import type { ApiRow, HanziItem } from '../types'
import { normalizeRow } from '../utils/normalize'
import { loadJson, saveJson } from '../utils/storage'

const API_URL = import.meta.env.DEV
  ? '/api/hanzi'
  : 'https://5ecvq3d6ri.execute-api.eu-west-2.amazonaws.com/api/sheet/hanzi/hero'
const CACHE_KEY = 'hanzi-cache-v1'

type CachePayload = {
  items: HanziItem[]
  fetchedAt: string
}

export const useHanziData = () => {
  const [items, setItems] = useState<HanziItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isUsingCache, setIsUsingCache] = useState(false)

  useEffect(() => {
    const cache = loadJson<CachePayload | null>(CACHE_KEY, null)
    if (cache?.items?.length) {
      setItems(cache.items)
    }

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      setIsUsingCache(false)
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }
        const data = (await response.json()) as ApiRow[]
        if (!Array.isArray(data)) {
          throw new Error('Unexpected API response')
        }
        const normalized = data.map((row, index) => normalizeRow(row, index))
        setItems(normalized)
        saveJson<CachePayload>(CACHE_KEY, {
          items: normalized,
          fetchedAt: new Date().toISOString()
        })
      } catch (fetchError) {
        const cached = loadJson<CachePayload | null>(CACHE_KEY, null)
        if (cached?.items?.length) {
          setItems(cached.items)
          setIsUsingCache(true)
        }
        setError(
          fetchError instanceof Error ? fetchError.message : 'Fetch failed'
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return {
    items,
    isLoading,
    error,
    isUsingCache
  }
}

