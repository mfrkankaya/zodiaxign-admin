import React, { useState } from 'react'
import { useAnalyzesList } from '../contexts/AnalyzesListContext'
import {
  updateAnalysis,
  deleteAnalysis
} from '../firebase/collections/analyzes'
import ParagraphInput from './ParagraphInput'

const AnalysisModal = ({ close, text, ...props }) => {
  const { updateAnalysisInStore, deleteAnalysisInStore } = useAnalyzesList()
  const [localText, setLocalText] = useState(text)
  const [pending, setPending] = useState(false)

  const handleUpdate = () => {
    setPending(true)
    updateAnalysis({ ...props, text: localText })
      .then(() => {
        updateAnalysisInStore({ ...props, text: localText })
        close()
      })
      .finally(() => setPending(false))
  }

  const handleRemove = () => {
    if (confirm('Analizin silinmesini onaylıyor musun?')) {
      deleteAnalysis(props.id).then(() => {
        deleteAnalysisInStore(props.id)
        close()
      })
    }
  }

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-center items-center"
      onClick={close}>
      <div
        className="w-11/12 max-w-2xl rounded bg-slate-800 shadow-xl p-4"
        onClick={(e) => e.stopPropagation()}>
        <ParagraphInput
          className="mt-4"
          value={localText}
          onChange={(e) => setLocalText(e.target.value)}
          placeholder="Analiz"
        />

        {pending ? (
          <div className="mt-3">Güncelleniyor...</div>
        ) : (
          <div className="flex space-x-2 mt-2">
            <button
              className="px-4 py-2 rounded bg-indigo-600"
              onClick={handleUpdate}>
              Güncelle
            </button>
            <button
              className="px-4 py-2 rounded bg-red-600"
              onClick={handleRemove}>
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalysisModal
