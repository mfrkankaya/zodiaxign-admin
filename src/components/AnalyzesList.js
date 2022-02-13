import clsx from 'clsx'
import React from 'react'
import { useAnalyzesList } from '../contexts/AnalyzesListContext'
import AnalysisListItem from './AnalysisListItem'

const AanlyzesList = () => {
  const { analyzes, loading, loadAnalyzes, isLoadAvailable } = useAnalyzesList()

  const handleLoadMore = () => {
    loadAnalyzes(analyzes[analyzes.length - 1].createdAt - 1)
  }

  return (
    <div className='pb-12'>
      <div className="grid gap-4 grid-cols-1">
        {analyzes.map((analysis) => (
          <AnalysisListItem key={analysis.id} {...analysis} />
        ))}
      </div>

      {loading ? (
        <div className="mt-8">Yükleniyor...</div>
      ) : (
        <button
          disabled={!isLoadAvailable}
          className={clsx('px-4 py-2 mt-6 rounded bg-indigo-600', {
            'bg-slate-700 text-slate-500': !isLoadAvailable
          })}
          onClick={handleLoadMore}>
          Daha fazla yükle
        </button>
      )}
    </div>
  )
}

export default AanlyzesList
