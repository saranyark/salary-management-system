import './EmployeeTable.css'

function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Country</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="no-data">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map(employee => (
              <tr key={employee.id}>
                <td>{`${employee.first_name} ${employee.last_name}`}</td>
                <td>{employee.email}</td>
                <td>{employee.job_title}</td>
                <td>{employee.country}</td>
                <td>${employee.salary?.toLocaleString()}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => onEdit(employee)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(employee.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeTable