import React from 'react'
import Layout from '../components/Layout'
import HoroscopeListItem from '../components/HoroscopeListItem'
import HoroscopeModal from '../components/HoroscopeModal'
import { HOROSCOPES } from '../constants/horoscopes'
import { ActiveHoroscopeProvider } from '../contexts/ActiveHoroscopeContext'

const Horoscopes = () => {
  return (
    <ActiveHoroscopeProvider>
      <Layout>
        <div className="mt-4 px-4 grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {HOROSCOPES.map((horoscope) => (
            <HoroscopeListItem key={horoscope.slug} {...horoscope} />
          ))}
        </div>
        <HoroscopeModal />
      </Layout>
    </ActiveHoroscopeProvider>
  )
}

export default Horoscopes
