import React from 'react'
import { usePhotopostsList } from '../contexts/PhotopostsListContext'
import { removePhotopost } from '../firebase/collections/photoposts'

const PhotopostListItem = (props) => {
  const { deletePhotopostInStore } = usePhotopostsList()
  const { url, id } = props

  const handleDelete = () => {
    if (confirm('Fotoğraf silinecek, onaylıyor musun?')) {
      removePhotopost(props).then(() => {
        deletePhotopostInStore(id)
      })
    }
  }

  return (
    <div className="p-4 bg-slate-700 rounded">
      <img src={url} className="w-full h-80 object-cover" />
      <button
        className="px-4 py-2 rounded w-full bg-red-600 mt-4"
        onClick={handleDelete}>
        Fotoğrafı sil
      </button>
    </div>
  )
}

export default PhotopostListItem
