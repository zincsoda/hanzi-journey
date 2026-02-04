import { useEffect, useMemo, useState } from 'react'
import DetailView from './components/DetailView'
import HanziCard from './components/HanziCard'
import OfflineBadge from './components/OfflineBadge'
import SearchBar from './components/SearchBar'
import { useFavorites } from './hooks/useFavorites'
import { useHanziData } from './hooks/useHanziData'
import { useOnlineStatus } from './hooks/useOnlineStatus'
import type { HanziItem } from './types'

const PAGE_SIZE = 50

type View = 'list' | 'favorites' | 'detail'

const App = () => {
  const { items, isLoading, error, isUsingCache } = useHanziData()
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites()
  const isOnline = useOnlineStatus()
  const [view, setView] = useState<View>('list')
  const [returnView, setReturnView] = useState<'list' | 'favorites'>('list')
  const [searchTerm, setSearchTerm] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [detailList, setDetailList] = useState<HanziItem[]>([])
  const [detailIndex, setDetailIndex] = useState(0)

  const normalizedQuery = searchTerm.trim().toLowerCase()
  const favoritesFilterOn = view === 'favorites'

  const scopedItems = useMemo(() => {
    return items.filter((item) => {
      if (favoritesFilterOn && !favoriteIds.has(item.id)) {
        return false
      }
      if (!normalizedQuery) {
        return true
      }
      const haystack = `${item.hanzi} ${item.pinyin} ${item.meaning} ${item.mnemonic}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [favoritesFilterOn, favoriteIds, items, normalizedQuery])

  const visibleItems = scopedItems.slice(0, visibleCount)
  const canLoadMore = visibleCount < scopedItems.length

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [favoritesFilterOn, normalizedQuery, items.length])

  useEffect(() => {
    if (view === 'detail' && detailList.length === 0) {
      setView('list')
    }
  }, [detailList.length, view])

  const openDetail = (id: string) => {
    const list = scopedItems
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) {
      return
    }
    setDetailList(list)
    setDetailIndex(index)
    setReturnView(view === 'favorites' ? 'favorites' : 'list')
    setView('detail')
  }

  const detailItem = detailList[detailIndex]

  return (
    <div className="safe-area m-4 min-h-screen bg-slate-50 px-6 pb-16 pt-6 text-slate-900 dark:bg-slate-950 dark:text-slate-50 sm:m-6 sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <header className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Hanzi Journey</h1>
          </div>
          <OfflineBadge isOnline={isOnline} isUsingCache={isUsingCache} />
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Learn Hanzi with mnemonics and quick swipes. Add this app to your
            Home Screen for offline practice.
          </p>
        </header>

        {view !== 'detail' && (
          <div className="flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            {(['list', 'favorites'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setView(tab)}
                className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${
                  view === tab
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {tab === 'list'
                  ? 'All'
                  : `Favorites (${favoriteIds.size})`}
              </button>
            ))}
          </div>
        )}

        {view === 'detail' && detailItem ? (
          <DetailView
            item={detailItem}
            isFavorite={isFavorite(detailItem.id)}
            onToggleFavorite={() => toggleFavorite(detailItem.id)}
            onBack={() => setView(returnView)}
            onNext={() => setDetailIndex((index) => index + 1)}
            onPrev={() => setDetailIndex((index) => index - 1)}
            hasNext={detailIndex < detailList.length - 1}
            hasPrev={detailIndex > 0}
          />
        ) : (
          <>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            {isLoading && items.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                Loading Hanzi…
              </div>
            )}

            {!isLoading && scopedItems.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
                {favoritesFilterOn
                  ? 'No favorites yet.'
                  : 'No results found.'}
              </div>
            )}

            <div className="flex flex-col gap-4">
              {visibleItems.map((item) => (
                <HanziCard
                  key={item.id}
                  item={item}
                  isFavorite={isFavorite(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                  onSelect={() => openDetail(item.id)}
                />
              ))}
            </div>

            {canLoadMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold shadow-sm dark:border-slate-700"
              >
                Load more ({visibleCount}/{scopedItems.length})
              </button>
            )}

            {error && (
              <div className="rounded-2xl border border-rose-300 bg-rose-100 px-4 py-2 text-xs text-rose-800">
                {error}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App

