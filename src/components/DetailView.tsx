import type { HanziItem } from '../types'

type DetailViewProps = {
  item: HanziItem
  isFavorite: boolean
  onToggleFavorite: () => void
  onBack: () => void
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
}

const DetailView = ({
  item,
  isFavorite,
  onToggleFavorite,
  onBack,
  onNext,
  onPrev,
  hasNext,
  hasPrev
}: DetailViewProps) => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold shadow-sm dark:border-slate-700"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`rounded-full border px-4 py-2 text-sm font-semibold shadow-sm ${
            isFavorite
              ? 'border-amber-400 bg-amber-100 text-amber-600 dark:border-amber-500 dark:bg-amber-500/20'
              : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
          }`}
        >
          {isFavorite ? 'Favorited' : 'Favorite'}
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="text-6xl font-semibold">{item.hanzi || '—'}</div>
        <div className="mt-2 text-lg uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {item.pinyin || '—'}
        </div>
        <div className="mt-4 text-lg">{item.meaning || 'No meaning yet'}</div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Mnemonic
        </div>
        <p className="mt-2 text-base leading-relaxed text-slate-700 dark:text-slate-200">
          {item.mnemonic || 'No mnemonic yet.'}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold shadow-sm disabled:opacity-50 dark:border-slate-700"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="flex-1 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold shadow-sm disabled:opacity-50 dark:border-slate-700"
        >
          Next
        </button>
      </div>
    </section>
  )
}

export default DetailView

