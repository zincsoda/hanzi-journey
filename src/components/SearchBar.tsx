type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const hasValue = value.trim().length > 0

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search Hanzi
      </label>
      <div className="relative">
        <input
          id="search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search hanzi, pinyin, meaning, mnemonic"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-11 text-base shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
        />
        <button
          type="button"
          aria-label="Clear search"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onChange('')}
          className={[
            'absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1',
            'text-slate-500 hover:text-slate-700 focus:outline-none',
            'dark:text-slate-400 dark:hover:text-slate-200',
            hasValue ? 'opacity-100' : 'pointer-events-none opacity-0',
          ].join(' ')}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  )
}

export default SearchBar


