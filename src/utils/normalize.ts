import type { ApiRow, HanziItem } from '../types'

export const normalizeRow = (row: ApiRow, index: number): HanziItem => {
  const hanzi = row.Hanzi?.trim() ?? ''
  const pinyin = row.Pinyin?.trim() ?? ''
  const meaning = row.Meaning?.trim() ?? ''
  const mnemonic = row.Description?.trim() ?? ''
  const image = row.Image?.trim() ?? ''

  return {
    id: `${hanzi}-${pinyin}-${index}`,
    hanzi,
    pinyin,
    meaning,
    mnemonic,
    image: image || undefined
  }
}

