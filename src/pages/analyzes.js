import React from 'react'
import Layout from '../components/Layout'
import AnalyzesList from '../components/AnalyzesList'
import { AnalyzesListProvider } from '../contexts/AnalyzesListContext'
import CreateAnalysisForm from '../components/CreateAnalysisForm'

const Analyzes = () => {
  return (
    <Layout>
      <AnalyzesListProvider>
        <div className="px-4 mt-4">
          <CreateAnalysisForm />

          <AnalyzesList />
        </div>
      </AnalyzesListProvider>
    </Layout>
  )
}

export default Analyzes
