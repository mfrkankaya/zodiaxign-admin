import React from 'react'
import clsx from 'clsx'
import TextArea from 'react-textarea-autosize'

const ParagraphInput = ({ className, ...props }) => {
  return (
    <TextArea
      className={clsx(
        'resize-none w-full py-3 px-4 bg-slate-700 rounded outline-none border border-slate-700 focus:border-gray-500',
        className
      )}
      {...props}
    />
  )
}

ParagraphInput.defaultProps = {
  className: '',
  maxRows: 10
}

export default ParagraphInput
