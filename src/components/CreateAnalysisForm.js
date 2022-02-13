import React, { useState } from 'react'
import { useAnalyzesList } from '../contexts/AnalyzesListContext'
import { addAnalysis } from '../firebase/collections/analyzes'
import ParagraphInput from './ParagraphInput'

const CreateAnalysisForm = () => {
  const { addAnalysisToStore } = useAnalyzesList()
  const [text, setText] = useState('')
  const [pending, setPending] = useState(false)

  const handleSubmit = () => {
    setPending(true)
    addAnalysis({ text })
      .then((newAnalysis) => {
        addAnalysisToStore(newAnalysis)
      })
      .finally(() => {
        setPending(false)
        setText('')
      })
  }

  return (
    <div className="mb-16">
      <ParagraphInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Analiz"
      />

      {pending ? (
        <div className="mt-3">Kaydediliyor...</div>
      ) : (
        <button
          className="px-4 py-2 mt-2 rounded bg-indigo-600"
          onClick={handleSubmit}>
          Analizi kaydet
        </button>
      )}
    </div>
  )
}

export default CreateAnalysisForm
