// Copyright (C) 2012-2022 Zammad Foundation, https://zammad-foundation.org/

export interface ImageFileData {
  name: string
  type: string
  content: string
}

export const blobToBase64 = async (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })

export const convertFileList = async (
  filesList?: Maybe<FileList>,
): Promise<ImageFileData[]> => {
  const files = Array.from(filesList || [])

  const promises = files.map(async (file) => {
    return {
      name: file.name,
      type: file.type,
      content: await blobToBase64(file),
    }
  })

  return Promise.all(promises)
}

export default {}
