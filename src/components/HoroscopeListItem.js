import React from 'react'
import { useActiveHoroscope } from '../contexts/ActiveHoroscopeContext'

const HoroscopeListItem = ({ slug, name, onClick }) => {
  const context = useActiveHoroscope()

  return (
    <button
      className="bg-indigo-600 px-4 py-2 rounded cursor-pointer"
      onClick={() => (onClick ? onClick(slug) : context.setSlug(slug))}>
      {name}
    </button>
  )
}

export default HoroscopeListItem
