import React from 'react'
import { useActiveHoroscope } from '../../contexts/ActiveHoroscopeContext'
import HoroscopeUpdateForm from '../HoroscopeUpdateForm'

const HoroscopeModal = () => {
  const { slug, setSlug, data, loading } = useActiveHoroscope()

  if (!slug) return null

  return (
    <div
      className="fixed top-0 right-0 bottom-0 left-0 z-20 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex justify-center items-center"
      onClick={() => setSlug(null)}>
      {loading ? (
        <div>Yükleniyor</div>
      ) : (
        <div
          className="w-11/12 max-w-2xl rounded bg-slate-800 shadow-xl p-4"
          onClick={(e) => e.stopPropagation()}>
          <HoroscopeUpdateForm data={data} />
        </div>
      )}
    </div>
  )
}

export default HoroscopeModal
