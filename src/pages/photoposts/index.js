import React from 'react'
import { useRouter } from 'next/router'
import HoroscopeListItem from '../../components/HoroscopeListItem'
import Layout from '../../components/Layout'
import { HOROSCOPES } from '../../constants/horoscopes'

const Photoposts = () => {
  const router = useRouter()
  return (
    <Layout>
      <div className="px-4 mt-4">
        <div className="mt-4 grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
          {HOROSCOPES.map((horoscope) => (
            <HoroscopeListItem
              key={horoscope.slug}
              {...horoscope}
              onClick={(slug) => router.push(`/photoposts/${slug}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Photoposts
