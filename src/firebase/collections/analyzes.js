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
import { firestore } from '../firebase'

const analyzesCollection = collection(firestore, 'analyzes')

export const addAnalysis = async (analysis) => {
  const docRef = await addDoc(analyzesCollection, analysis)
  return { id: docRef.id, ...analysis }
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
      limit(20)
    )
  )

  return snaps.docs.map((doc) => ({ ...doc.data() }))
}
