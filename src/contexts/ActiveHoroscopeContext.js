import React, { createContext, useContext, useEffect, useState } from 'react'
import { getHoroscope } from '../firebase/collections/horoscopes'

const Context = createContext()

export const ActiveHoroscopeProvider = ({ children }) => {
  const [slug, setSlug] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (slug) {
      setLoading(true)
      getHoroscope(slug)
        .then(setData)
        .finally(() => setLoading(false))
      return
    }

    setData(null)
    setLoading(false)
    setSlug(null)
  }, [slug])

  return (
    <Context.Provider value={{ slug, setSlug, loading, data }}>
      {children}
    </Context.Provider>
  )
}

export const useActiveHoroscope = () => useContext(Context)
