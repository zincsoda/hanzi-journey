type ToggleProps = {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

const Toggle = ({ label, checked, onChange }: ToggleProps) => {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5"
      />
    </label>
  )
}

export default Toggle


