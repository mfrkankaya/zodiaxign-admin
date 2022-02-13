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
  deleteDoc
} from 'firebase/firestore'
import { firestore } from '../'

export const ANALYZES_PER_PAGE = 20
const analyzesCollection = collection(firestore, 'analyzes')

export const addAnalysis = async (analysis) => {
  const docRef = await addDoc(analyzesCollection, analysis)
  return { id: docRef.id, ...analysis, createdAt: new Date().getTime() }
}

export const updateAnalysis = async (analysis) => {
  const { id, text } = analysis
  const docRef = doc(firestore, 'analyzes', id)
  await updateDoc(docRef, { text })
}

export const deleteAnalysis = async (analysisId) => {
  await deleteDoc(doc(firestore, 'analyzes', analysisId))
}

export const getAnalyzes = async (start = new Date().getTime()) => {
  const snaps = await getDocs(
    query(
      analyzesCollection,
      orderBy('createdAt', 'desc'),
      startAt(start),
      limit(ANALYZES_PER_PAGE)
    )
  )

  return snaps.docs.map((doc) => ({ ...doc.data() }))
}
