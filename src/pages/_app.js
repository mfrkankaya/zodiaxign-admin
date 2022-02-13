import { useEffect } from 'react'
import '../styles/global.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user && window.location.pathname !== '/login')
        window.location.href = '/login'
    })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
