export type ApiRow = {
  Pinyin?: string
  Hanzi?: string
  Meaning?: string
  Image?: string
  'Has Image'?: string
  Description?: string
}

export type HanziItem = {
  id: string
  hanzi: string
  pinyin: string
  meaning: string
  mnemonic: string
  image?: string
  hasImage: boolean
}


