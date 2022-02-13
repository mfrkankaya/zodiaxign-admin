import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore'
import { firestore } from '../'

const horoscopesCollection = collection(firestore, 'horoscopes')

export const getHoroscope = async (slug) => {
  const docRef = doc(firestore, 'horoscopes', slug)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
}

export const getHoroscopes = async () => {
  const snaps = await getDocs(horoscopesCollection)
  if (snaps.docs.length) return snaps.docs.map((doc) => ({ ...doc.data() }))
  return []
}

export const updateHoroscope = async (horoscope) => {
  const { id, daily, weekly, monthly } = horoscope
  const docRef = doc(firestore, 'horoscopes', id)
  await updateDoc(docRef, { daily, weekly, monthly })
}
