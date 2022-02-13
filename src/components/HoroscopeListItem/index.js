import React from 'react'
import { useActiveHoroscope } from '../../contexts/ActiveHoroscopeContext'

const HoroscopeListItem = ({ slug, name }) => {
  const { setSlug } = useActiveHoroscope()

  return (
    <button
      className="bg-indigo-600 px-4 py-2 rounded cursor-pointer"
      onClick={() => setSlug(slug)}>
      {name}
    </button>
  )
}

export default HoroscopeListItem
