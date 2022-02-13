import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '..'

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
