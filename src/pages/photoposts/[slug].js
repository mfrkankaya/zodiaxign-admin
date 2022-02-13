import React, { useMemo } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import CreatePhotopostForm from '../../components/CreatePhotopostForm'
import { HOROSCOPES } from '../../constants/horoscopes'
import { PhotopostsListProvider } from '../../contexts/PhotopostsListContext'
import PhotopostsList from '../../components/PhotopostsList'

const PhotopostHoroscopePage = () => {
  const {
    query: { slug }
  } = useRouter()

  const name = useMemo(() => {
    const selectedHoroscope = HOROSCOPES.find(
      (horoscope) => horoscope.slug === slug
    )

    if (selectedHoroscope) return selectedHoroscope.name
    return ''
  }, [slug])

  return (
    <PhotopostsListProvider slug={slug}>
      <Layout>
        <div className="px-4 mt-4">
          <h1 className="text-indigo-300 text-2xl font-bold mb-4">{name}</h1>
          <CreatePhotopostForm slug={slug} />
          <PhotopostsList />
        </div>
      </Layout>
    </PhotopostsListProvider>
  )
}

export default PhotopostHoroscopePage
