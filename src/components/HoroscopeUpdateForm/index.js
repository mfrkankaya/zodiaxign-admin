import React, { useState } from 'react'
import { updateHoroscope } from '../../firebase/collections/horoscopes'
import ParagraphInput from '../ParagraphInput'

const TAB_MAP = {
  daily: 'Günlük',
  weekly: 'Haftalık',
  monthly: 'Aylık'
}

const HoroscopeUpdateForm = ({ data, onSave = () => null }) => {
  const [horoscope, setHoroscope] = useState(data)
  const [activeTab, setActiveTab] = useState('daily')
  const [pending, setPending] = useState(false)

  const handleChange = (e) =>
    setHoroscope({ ...horoscope, [activeTab]: e.target.value })

  const handleSave = () => {
    setPending(true)
    updateHoroscope(horoscope)
      .then(onSave)
      .finally(() => setPending(false))
  }

  if (!horoscope) return null

  const buttonClass = 'px-4 py-2 rounded bg-indigo-600'
  return (
    <div>
      <div className="font-bold text-lg text-indigo-300">{horoscope.name}</div>
      <div className="space-x-2 flex mt-2">
        <button className={buttonClass} onClick={() => setActiveTab('daily')}>
          Günlük
        </button>
        <button className={buttonClass} onClick={() => setActiveTab('weekly')}>
          Haftalık
        </button>
        <button className={buttonClass} onClick={() => setActiveTab('monthly')}>
          Aylık
        </button>
      </div>
      <ParagraphInput
        className="mt-4"
        value={horoscope[activeTab]}
        onChange={handleChange}
        placeholder={TAB_MAP[activeTab]}
      />

      {pending ? (
        <button className="px-4 py-2 mt-4 rounded bg-slate-700">
          Kaydediliyor...
        </button>
      ) : (
        <button
          className="px-4 py-2 mt-4 rounded bg-indigo-600"
          onClick={handleSave}>
          Değişiklikleri Kaydet
        </button>
      )}
    </div>
  )
}

export default HoroscopeUpdateForm
