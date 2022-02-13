import React from 'react'
import Link from 'next/link'

const Header = () => {
  const linkClassName = 'py-1 px-2 inline-block rounded bg-indigo-600'

  return (
    <header className="bg-slate-900 border-b border-b-slate-700 py-2">
      <div className="px-4 text-indigo-300 font-bold text-2xl">Zodiaxign</div>
      <div className="space-x-2 mt-1 px-4 overflow-x-auto">
        <Link href="/horoscopes">
          <a className={linkClassName}>Burçlar</a>
        </Link>
        <Link href="/analyzes">
          <a className={linkClassName}>Analizler</a>
        </Link>
        <Link href="/photoposts">
          <a className={linkClassName}>Fotoğraflar</a>
        </Link>
      </div>
    </header>
  )
}

export default Header
