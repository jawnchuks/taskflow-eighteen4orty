import React, { useState } from 'react'
import { Search as SearchIcon } from 'react-feather'

interface SearchProps {
  onSearch?: (query: string) => void
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value
    setQuery(q)
    if (onSearch) onSearch(q)
  }

  return (
    <div className="search">
      <SearchIcon size={20} color="currentColor" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={handleChange}
        className="search_input"
      />
    </div>
  )
}

export default Search
