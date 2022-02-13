import { createContext, useContext, useEffect, useState } from 'react'
import {
  ANALYZES_PER_PAGE,
  getAnalyzes
} from '../firebase/collections/analyzes'
import { findAndDelete, findAndUpdate } from '../utils/array'

const Context = createContext()

export const AnalyzesListProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [isLoadAvailable, setIsLoadAvailable] = useState(true)

  const loadAnalyzes = (start = new Date().getTime()) => {
    setLoading(true)
    getAnalyzes(start)
      .then((newData) => {
        setData((data) => [...data, ...newData])
        setIsLoadAvailable(newData.length === ANALYZES_PER_PAGE)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadAnalyzes()
  }, [])

  const addAnalysisToStore = (analysis) => {
    setData((data) => [analysis, ...data])
  }

  const updateAnalysisInStore = (analysis) => {
    const updatedArray = findAndUpdate(data, analysis)
    setData(updatedArray)
  }

  const deleteAnalysisInStore = (analysisId) => {
    const updatedArray = findAndDelete(data, analysisId)
    setData(updatedArray)
  }

  return (
    <Context.Provider
      value={{
        analyzes: data,
        loading,
        loadAnalyzes,
        isLoadAvailable,
        updateAnalysisInStore,
        deleteAnalysisInStore,
        addAnalysisToStore
      }}>
      {children}
    </Context.Provider>
  )
}

export const useAnalyzesList = () => useContext(Context)
