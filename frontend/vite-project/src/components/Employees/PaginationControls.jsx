import './PaginationControls.css'

function PaginationControls({ pagination, onPageChange, onPerPageChange }) {
  const { page, perPage, total, totalPages } = pagination
  const startItem = (page - 1) * perPage + 1
  const endItem = Math.min(page * perPage, total)

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i)
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (total === 0) return null

  return (
    <div className="pagination-controls">
      <div className="pagination-info">
        <span>
          Showing {startItem} to {endItem} of {total} employees
        </span>
      </div>

      <div className="pagination-main">
        <div className="per-page-selector">
          <label htmlFor="per-page">Show:</label>
          <select
            id="per-page"
            value={perPage}
            onChange={(e) => onPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>per page</span>
        </div>

        <div className="pagination-buttons">
          <button
            className="btn btn-sm"
            onClick={() => onPageChange(1)}
            disabled={page === 1}
          >
            First
          </button>
          <button
            className="btn btn-sm"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <div className="page-numbers">
            {getVisiblePages().map((pageNum, index) => (
              <button
                key={index}
                className={`btn btn-sm ${pageNum === page ? 'active' : ''}`}
                onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
                disabled={typeof pageNum !== 'number'}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            className="btn btn-sm"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
          <button
            className="btn btn-sm"
            onClick={() => onPageChange(totalPages)}
            disabled={page === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaginationControls