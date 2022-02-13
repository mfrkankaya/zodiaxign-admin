import React, { useState } from 'react'
import { usePhotopostsList } from '../contexts/PhotopostsListContext'
import { uploadPhotoposts } from '../firebase/collections/photoposts'

const CreatePhotopostForm = ({ slug }) => {
  const { addPhotopostToStore } = usePhotopostsList()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [pending, setPending] = useState(false)

  const handleSubmit = () => {
    setPending(true)
    uploadPhotoposts(selectedFiles, slug)
      .then((posts) => {
        posts.forEach((photopost) => {
          addPhotopostToStore(photopost)
        })
      })
      .finally(() => setPending(false))
  }

  return (
    <div>
      <label className="p-4 rounded bg-slate-700 w-full block cursor-pointer">
        <input
          type="file"
          className="cursor-pointer"
          multiple
          onChange={(e) => setSelectedFiles(e.target.files)}
        />
      </label>
      {pending ? (
        <div className="mt-6">Yükleniyor...</div>
      ) : (
        <button
          className="px-4 py-2 bg-indigo-600 rounded mt-4"
          onClick={handleSubmit}>
          Yükle
        </button>
      )}
    </div>
  )
}

export default CreatePhotopostForm
