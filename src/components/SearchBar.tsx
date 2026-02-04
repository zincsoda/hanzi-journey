type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search Hanzi
      </label>
      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search hanzi, pinyin, meaning, mnemonic"
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900"
      />
    </div>
  )
}

export default SearchBar


