import type { HanziItem } from '../types'

type HanziCardProps = {
  item: HanziItem
  isFavorite: boolean
  onToggleFavorite: () => void
  onSelect: () => void
}

const HanziCard = ({
  item,
  isFavorite,
  onToggleFavorite,
  onSelect
}: HanziCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onSelect()
        }
      }}
      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <div className="text-3xl font-semibold">{item.hanzi || '—'}</div>
        <div className="text-sm uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {item.pinyin || '—'}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">
          {item.meaning || 'No meaning yet'}
        </div>
      </div>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation()
          onToggleFavorite()
        }}
        className={`ml-4 h-11 w-11 rounded-full border text-lg ${
          isFavorite
            ? 'border-amber-400 bg-amber-100 text-amber-500 dark:border-amber-500 dark:bg-amber-500/20'
            : 'border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800'
        }`}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
      >
        ★
      </button>
    </div>
  )
}

export default HanziCard

