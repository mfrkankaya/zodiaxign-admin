import React, { Fragment, useState } from 'react'
import AnalysisModal from '../AnalysisModal'

const AnalysisListItem = (props) => {
  const { text } = props
  const [isModalActive, setIsModalActive] = useState(false)

  return (
    <Fragment>
      <button
        className="p-4 rounded bg-slate-700 text-left"
        onClick={() => setIsModalActive(true)}>
        {text.slice(0, 180)}
        {text.length > 180 ? '...' : ''}
      </button>

      {isModalActive && (
        <AnalysisModal {...props} close={() => setIsModalActive(false)} />
      )}
    </Fragment>
  )
}

export default AnalysisListItem
