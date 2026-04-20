import { useState, useEffect } from 'react'
import './EmployeeFilters.css'

function EmployeeFilters({ filters, onFilterChange, employees }) {
  const [searchInput, setSearchInput] = useState(filters.search)
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.search) {
        onFilterChange({
          ...filters,
          search: searchInput
        })
      }
    }, 300) // Wait 300ms after user stops typing

    return () => clearTimeout(timer)
  }, [searchInput, filters, onFilterChange])

  const countries = [...new Set(employees.map(emp => emp.country))].filter(Boolean)
  const jobTitles = [...new Set(employees.map(emp => emp.job_title))].filter(Boolean)

  const handleInputChange = (field, value) => {
    if (field === 'search') {
      setSearchInput(value)
    } else {
      onFilterChange({
        ...filters,
        [field]: value
      })
    }
  }

  const clearFilters = () => {
    setSearchInput('')
    onFilterChange({
      search: '',
      country: '',
      jobTitle: ''
    })
  }

  return (
    <div className="employee-filters">
      <div className="filters-row">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name or email..."
            value={searchInput}
            onChange={(e) => handleInputChange('search', e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={filters.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="jobTitle">Job Title</label>
          <select
            id="jobTitle"
            value={filters.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          >
            <option value="">All Job Titles</option>
            {jobTitles.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn btn-secondary" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeFilters
