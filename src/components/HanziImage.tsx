import { useEffect, useMemo, useState } from 'react'

const IMAGE_BASE_URL = 'https://sw-hanzi.s3.ap-southeast-1.amazonaws.com/'

const buildImageUrl = (hanzi: string, ext: 'png' | 'jpeg') =>
  `${IMAGE_BASE_URL}${encodeURIComponent(hanzi)}.${ext}`

type HanziImageProps = {
  hanzi: string
  alt?: string
  className?: string
  showPlaceholder?: boolean
  onImageClick?: (src: string) => void
}

const HanziImage = ({
  hanzi,
  alt,
  className = '',
  showPlaceholder = false,
  onImageClick
}: HanziImageProps) => {
  const trimmed = useMemo(() => hanzi.trim(), [hanzi])
  const [src, setSrc] = useState<string | null>(null)
  const [didTryJpeg, setDidTryJpeg] = useState(false)

  useEffect(() => {
    if (!trimmed) {
      setSrc(null)
      setDidTryJpeg(false)
      return
    }
    setDidTryJpeg(false)
    setSrc(buildImageUrl(trimmed, 'png'))
  }, [trimmed])

  if (!trimmed || !src) {
    if (!showPlaceholder) {
      return null
    }
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-slate-200 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400 ${className}`}
      >
        No image available
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt ?? `Illustration for ${trimmed}`}
      className={className}
      loading="lazy"
      role={onImageClick ? 'button' : undefined}
      tabIndex={onImageClick ? 0 : undefined}
      onClick={onImageClick ? () => onImageClick(src) : undefined}
      onKeyDown={
        onImageClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onImageClick(src)
              }
            }
          : undefined
      }
      onError={() => {
        if (!didTryJpeg) {
          setDidTryJpeg(true)
          setSrc(buildImageUrl(trimmed, 'jpeg'))
          return
        }
        setSrc(null)
      }}
    />
  )
}

export default HanziImage
