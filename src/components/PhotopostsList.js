import clsx from 'clsx'
import React from 'react'
import { usePhotopostsList } from '../contexts/PhotopostsListContext'
import PhotopostListItem from './PhotopostListItem'

const PhotopostsList = () => {
  const { photoposts, loading, loadPhotoposts, isLoadAvailable } =
    usePhotopostsList()

  const handleLoadMore = () => {
    loadPhotoposts(photoposts[photoposts.length - 1].createdAt - 1)
  }

  return (
    <div className="pb-12 mt-8">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {photoposts.map((photopost) => (
          <PhotopostListItem key={photopost.id} {...photopost} />
        ))}
      </div>

      {loading ? (
        <div className="mt-8">Yükleniyor...</div>
      ) : (
        <button
          disabled={!isLoadAvailable}
          className={clsx('px-4 py-2 mt-6 rounded bg-indigo-600', {
            'bg-slate-700 text-slate-500': !isLoadAvailable
          })}
          onClick={handleLoadMore}>
          Daha fazla yükle
        </button>
      )}
    </div>
  )
}

export default PhotopostsList
