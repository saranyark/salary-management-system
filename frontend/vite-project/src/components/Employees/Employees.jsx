import { useState, useEffect } from 'react'
import apiService from '../../services/api'
import EmployeeTable from './EmployeeTable'
import EmployeeModal from './EmployeeModal'
import EmployeeFilters from './EmployeeFilters'
import PaginationControls from './PaginationControls'
import './Employees.css'

function Employees() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    jobTitle: ''
  })
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
    totalPages: 0
  })

  useEffect(() => {
    fetchEmployees()
  }, [pagination.page, filters.country, filters.jobTitle])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      const params = {
        page: pagination.page,
        per_page: pagination.perPage
      }

      // Add filters if they exist
      if (filters.country) params.country = filters.country
      if (filters.jobTitle) params.job_title = filters.jobTitle
      
      // Request newest first
      params.sort = 'id_desc'

      const response = await apiService.getEmployees(params)
      setEmployees(response.data || [])
      setPagination(prev => ({
        ...prev,
        total: response.meta?.total || 0,
        totalPages: response.meta?.total_pages || 0
      }))
    } catch (error) {
      console.error('Error fetching employees:', error)
      setEmployees([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddEmployee = () => {
    setEditingEmployee(null)
    setModalOpen(true)
  }

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee)
    setModalOpen(true)
  }

  const handleDeleteEmployee = async (id) => {
    if (!confirm('Are you sure you want to delete this employee?')) return

    try {
      await apiService.deleteEmployee(id)
      setEmployees(employees.filter(emp => emp.id !== id))
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert(`Error deleting employee: ${error.message}`)
    }
  }

  const handleSaveEmployee = async (employeeData) => {
    try {
      const savedEmployee = await (editingEmployee
        ? apiService.updateEmployee(editingEmployee.id, employeeData)
        : apiService.createEmployee(employeeData))

      if (editingEmployee) {
        setEmployees(employees.map(emp =>
          emp.id === editingEmployee.id ? savedEmployee : emp
        ))
      } else {
        setEmployees([savedEmployee, ...employees])
      }
      setModalOpen(false)
      // Refresh employee list to ensure consistency
      fetchEmployees()
    } catch (error) {
      console.error('Error saving employee:', error)
      alert(`Error saving employee: ${error.message}`)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    setPagination(prev => ({ ...prev, page: 1 })) // Reset to first page when filters change
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }))
    }
  }

  const handlePerPageChange = (newPerPage) => {
    setPagination(prev => ({ ...prev, perPage: newPerPage, page: 1 }))
  }

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = !filters.search ||
      `${employee.first_name} ${employee.last_name}`.toLowerCase().includes(filters.search.toLowerCase()) ||
      employee.email.toLowerCase().includes(filters.search.toLowerCase())

    const matchesCountry = !filters.country || employee.country === filters.country
    const matchesJobTitle = !filters.job_title || employee.job_title === filters.job_title

    return matchesSearch && matchesCountry && matchesJobTitle
  })

  if (loading) {
    return <div className="loading">Loading employees...</div>
  }

  return (
    <div className="employees">
      <div className="employees-header">
        <div className="header-content">
          <h1>Employee Management</h1>
          <p>Manage your organization's employee data</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>

      <EmployeeFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        employees={employees}
      />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={handleEditEmployee}
        onDelete={handleDeleteEmployee}
      />

      <PaginationControls
        pagination={pagination}
        onPageChange={handlePageChange}
        onPerPageChange={handlePerPageChange}
      />

      {modalOpen && (
        <EmployeeModal
          employee={editingEmployee}
          onSave={handleSaveEmployee}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}

export default Employees