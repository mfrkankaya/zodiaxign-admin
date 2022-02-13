import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAgVmcFhv_IyEyUs8ENLMZFtw8MEaOcxZ4',
  authDomain: 'zodiaxign.firebaseapp.com',
  databaseURL:
    'https://zodiaxign-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'zodiaxign',
  storageBucket: 'zodiaxign.appspot.com',
  messagingSenderId: '1075063860603',
  appId: '1:1075063860603:web:275ac29fb2323c9918e1de',
  measurementId: 'G-HT2LMG2DX8'
}

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
