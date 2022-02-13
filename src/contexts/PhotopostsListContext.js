import { createContext, useContext, useEffect, useState } from 'react'
import {
  getPhotoposts,
  PHOTOPOSTS_PER_PAGE
} from '../firebase/collections/photoposts'
import { findAndDelete } from '../utils/array'

const Context = createContext()

export const PhotopostsListProvider = ({ children, slug }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [isLoadAvailable, setIsLoadAvailable] = useState(true)

  const loadPhotoposts = (start = new Date().getTime()) => {
    setLoading(true)
    getPhotoposts(slug, start)
      .then((newData) => {
        setData((data) => [...data, ...newData])
        setIsLoadAvailable(newData.length === PHOTOPOSTS_PER_PAGE)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (slug) loadPhotoposts()
  }, [slug])

  const addPhotopostToStore = (photopost) => {
    setData((data) => [photopost, ...data])
  }

  const deletePhotopostInStore = (photopostId) => {
    const updatedArray = findAndDelete(data, photopostId)
    setData(updatedArray)
  }

  return (
    <Context.Provider
      value={{
        photoposts: data,
        loading,
        loadPhotoposts,
        isLoadAvailable,
        addPhotopostToStore,
        deletePhotopostInStore
      }}>
      {children}
    </Context.Provider>
  )
}

export const usePhotopostsList = () => useContext(Context)
