import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  query,
  orderBy,
  startAt,
  limit,
  deleteDoc,
  where
} from 'firebase/firestore'
import {
  uploadBytes,
  ref,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { nanoid } from 'nanoid'
import { firestore, storage } from '../'

const photopostsCollection = collection(firestore, 'photoposts')
export const PHOTOPOSTS_PER_PAGE = 10

export const uploadPhotoposts = (files = [], slug) =>
  new Promise((resolve) => {
    let result = []

    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      const fileName = file.name
      const generatedFileName = `${fileName.split('.')[0]}-${nanoid()}.${
        fileName.split('.')[1]
      }`

      const imageRef = ref(
        storage,
        `img/photoposts/${slug}/${generatedFileName}`
      )

      uploadBytes(imageRef, file).then(async (snap) => {
        let url = await getDownloadURL(snap.ref)
        if (url.includes('&token=')) url = url.split('&token=')[0]

        const docRef = await addDoc(photopostsCollection, {
          slug,
          url,
          path: snap.ref.fullPath
        })

        result = [
          {
            id: docRef.id,
            slug,
            url,
            path: snap.ref.fullPath,
            createdAt: new Date().getTime()
          },
          ...result
        ]

        if (index === files.length - 1) resolve(result)
      })
    }
  })

export const getPhotoposts = async (slug, start = new Date().getTime()) => {
  if (!slug) return []

  const snaps = await getDocs(
    query(
      photopostsCollection,
      where('slug', '==', slug),
      orderBy('createdAt', 'desc'),
      startAt(start),
      limit(PHOTOPOSTS_PER_PAGE)
    )
  )

  return snaps.docs.map((doc) => ({ ...doc.data() }))
}

export const removePhotopost = async ({ id, path }) => {
  await deleteDoc(doc(firestore, 'photoposts', id))
  await deleteObject(ref(storage, path))
}

// export const ANALYZES_PER_PAGE = 20
// const analyzesCollection = collection(firestore, 'analyzes')

// export const addAnalysis = async (analysis) => {
//   const docRef = await addDoc(analyzesCollection, analysis)
//   return { id: docRef.id, ...analysis, createdAt: new Date().getTime() }
// }

// export const updateAnalysis = async (analysis) => {
//   const { id, text } = analysis
//   const docRef = doc(firestore, 'analyzes', id)
//   await updateDoc(docRef, { text })
// }

// export const deleteAnalysis = async (analysisId) => {
//   await deleteDoc(doc(firestore, 'analyzes', analysisId))
// }

// export const getAnalyzes = async (start = new Date().getTime()) => {
//   const snaps = await getDocs(
//     query(
//       analyzesCollection,
//       orderBy('createdAt', 'desc'),
//       startAt(start),
//       limit(ANALYZES_PER_PAGE)
//     )
//   )

//   return snaps.docs.map((doc) => ({ ...doc.data() }))
// }
