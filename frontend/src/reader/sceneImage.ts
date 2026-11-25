import { useCallback, useEffect, useState } from 'react'
import { db } from '@/db'

// reader background image, stored in IndexedDB as a blob
const SCENE_KEY = 'scene-background'

// accepted image types png and jpeg
export const SCENE_IMAGE_TYPES = ['image/png', 'image/jpeg']

export interface SceneImage {
  /* object URL for stored image, null for none */
  url: string | null
  set: (file: File) => Promise<void>
  clear: () => Promise<void>
}

/* apply image as css in .vn-bg */
function applySceneImage(url: string | null) {
  document.documentElement.style.setProperty('--vn-scene-image', url ? `url("${url}")` : 'none')
}

// apply background in reader ui
export function useSceneImage(): SceneImage {
  const [url, setUrl] = useState<string | null>(null)

  // read stored image on mount, ignore if none
  useEffect(() => {
    let ignore = false
    db.images
      .get(SCENE_KEY)
      .then((stored) => {
        if (ignore || !stored) return
        setUrl(URL.createObjectURL(stored.blob))
      })
      .catch(() => {
        // no IndexedDB saved image
      })
    return () => {
      ignore = true
    }
  }, [])

  // push to CSS, remove previous URL when image is replaced
  useEffect(() => {
    applySceneImage(url)
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [url])

  // file type check
  const set = useCallback(async (file: File) => {
    if (!SCENE_IMAGE_TYPES.includes(file.type)) return
    await db.images.put({ key: SCENE_KEY, blob: file })
    setUrl(URL.createObjectURL(file))
  }, [])

  // delete image
  const clear = useCallback(async () => {
    await db.images.delete(SCENE_KEY)
    setUrl(null)
  }, [])

  return { url, set, clear }
}
