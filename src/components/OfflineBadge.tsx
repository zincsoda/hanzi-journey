type OfflineBadgeProps = {
  isOnline: boolean
  isUsingCache: boolean
  error?: string | null
}

const OfflineBadge = ({ isOnline, isUsingCache }: OfflineBadgeProps) => {
  if (isOnline && !isUsingCache) {
    return null
  }

  const label = !isOnline ? 'Offline mode' : 'Using cached data'

  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900">
      {label}
    </div>
  )
}

export default OfflineBadge

