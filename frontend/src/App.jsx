import React, { useEffect, useMemo, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/books'
const PAGE_LIMIT = Number(import.meta.env.VITE_PAGE_LIMIT || 5)

function BookCard({ book }) {
  return (
    <div className="book-card">
      <img src={book.thumbnailUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>💲 {book.price}</p>
      <p>⭐ {book.rating}</p>
      <a href={book.detailUrl} target="_blank" rel="noreferrer">Details</a>
    </div>
  )
}

function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={page <= 1}>⬅ Previous</button>
      <span className="page-info">Page {page} of {totalPages || 1}</span>
      <button onClick={onNext} disabled={totalPages && page >= totalPages}>Next ➡</button>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadBooks(targetPage) {
    setLoading(true)
    setError('')
    try {
      const url = new URL(API_URL)
      url.searchParams.set('page', targetPage)
      url.searchParams.set('limit', PAGE_LIMIT)
      const res = await fetch(url.toString())
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
      }
      const data = await res.json()
      setBooks(data.books || [])
      setPage(data.page || targetPage)
      setTotalPages(data.totalPages || 1)
    } catch (err) {
      setError(err.message || 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBooks(1)
  }, [])

  const handlePrev = () => {
    if (page > 1) loadBooks(page - 1)
  }
  const handleNext = () => {
    if (!totalPages || page < totalPages) loadBooks(page + 1)
  }

  const grid = useMemo(() => books.map(b => <BookCard key={b.id || b.detailUrl || b.title} book={b} />), [books])

  return (
    <div className="container">
      <h1>📚 Book Explorer</h1>
      {error && <div className="error">⚠️ {error}</div>}
      {loading ? <div className="loading">Loading…</div> : (
        <div className="grid">{grid}</div>
      )}
      <Pagination page={page} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
    </div>
  )
}
