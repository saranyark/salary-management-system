import { useState, useEffect } from 'react'
import apiService from '../../services/api'
import MetricCard from '../Common/MetricCard'
import './Insights.css'

function Insights() {
  const [insights, setInsights] = useState({
    global: null,
    country: null,
    job: null,
    topEarners: []
  })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    country: '',
    jobTitle: ''
  })
  const [countries, setCountries] = useState([])
  const [jobTitles, setJobTitles] = useState([])

  useEffect(() => {
    fetchInsights()
    fetchFilterOptions()
  }, [filters])

  const fetchFilterOptions = async () => {
    try {
      const response = await apiService.getEmployees({ per_page: 10000 })
      const employees = response.data || []
      
      // Extract unique countries
      const uniqueCountries = [...new Set(employees.map(emp => emp.country))].filter(Boolean).sort()
      setCountries(uniqueCountries)
      
      // Extract unique job titles for selected country
      let uniqueJobTitles = []
      if (filters.country) {
        uniqueJobTitles = [...new Set(
          employees
            .filter(emp => emp.country === filters.country)
            .map(emp => emp.job_title)
        )].filter(Boolean).sort()
      }
      setJobTitles(uniqueJobTitles)
    } catch (error) {
      console.error('Error fetching filter options:', error)
    }
  }

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const requests = [apiService.getGlobalInsights()]
      
      // Only fetch country insights if country is selected
      if (filters.country) {
        requests.push(apiService.getCountryInsights(filters.country))
      } else {
        requests.push(Promise.resolve(null))
      }
      
      // Only fetch job insights if both country and jobTitle are selected
      if (filters.country && filters.jobTitle) {
        requests.push(apiService.getJobInsights(filters.country, filters.jobTitle))
      } else {
        requests.push(Promise.resolve(null))
      }
      
      // Always fetch top earners
      requests.push(apiService.getTopEarners())

      const [globalRes, countryRes, jobRes, topEarnersRes] = await Promise.all(requests)

      setInsights({
        global: globalRes,
        country: countryRes,
        job: jobRes,
        topEarners: topEarnersRes || []
      })
    } catch (error) {
      console.error('Error fetching insights:', error)
      setInsights({
        global: null,
        country: null,
        job: null,
        topEarners: []
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  if (loading) {
    return <div className="loading">Loading insights...</div>
  }

  return (
    <div className="insights">
      <div className="insights-header">
        <h1>Salary Insights</h1>
        <p>Analyze salary data and trends across your organization</p>
      </div>

      <div className="insights-filters">
        <div className="filter-group">
          <label htmlFor="country-filter">Filter by Country</label>
          <select
            id="country-filter"
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="job-filter">Filter by Job Title</label>
          <select
            id="job-filter"
            value={filters.jobTitle}
            onChange={(e) => handleFilterChange('jobTitle', e.target.value)}
            disabled={!filters.country}
          >
            <option value="">All Job Titles</option>
            {jobTitles.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="insights-content">
        {insights.global && (
          <div className="insights-section">
            <h2>Global Insights</h2>
            <div className="metrics-grid">
              <MetricCard
                title="Minimum Salary"
                value={`$${insights.global.min_salary?.toLocaleString() || 0}`}
                icon="📉"
                color="warning"
              />
              <MetricCard
                title="Average Salary"
                value={`$${insights.global.average_salary?.toLocaleString() || 0}`}
                icon="💰"
                color="success"
              />
              <MetricCard
                title="Maximum Salary"
                value={`$${insights.global.max_salary?.toLocaleString() || 0}`}
                icon="📈"
                color="info"
              />
              <MetricCard
                title="Median Salary"
                value={`$${insights.global.median_salary?.toLocaleString() || 0}`}
                icon="📊"
                color="primary"
              />
              <MetricCard
                title="Total Employees"
                value={insights.global.employee_count || 0}
                icon="👥"
                color="secondary"
              />
              <MetricCard
                title="Total Salary Budget"
                value={`$${insights.global.total_salary?.toLocaleString() || 0}`}
                icon="💵"
                color="danger"
              />
            </div>
          </div>
        )}

        {insights.country && (
          <div className="insights-section">
            <h2>Country Insights</h2>
            <div className="metrics-grid">
              <MetricCard
                title="Minimum Salary"
                value={`$${insights.country.min?.toLocaleString() || 0}`}
                icon="📉"
                color="warning"
              />
              <MetricCard
                title="Average Salary"
                value={`$${insights.country.avg?.toLocaleString() || 0}`}
                icon="💰"
                color="success"
              />
              <MetricCard
                title="Maximum Salary"
                value={`$${insights.country.max?.toLocaleString() || 0}`}
                icon="📈"
                color="info"
              />
              <MetricCard
                title="Median Salary"
                value={`$${insights.country.median?.toLocaleString() || 0}`}
                icon="📊"
                color="primary"
              />
              <MetricCard
                title="Total Employees"
                value={insights.country.count || 0}
                icon="👥"
                color="secondary"
              />
            </div>
          </div>
        )}

        {insights.job && (
          <div className="insights-section">
            <h2>Job Title Insights</h2>
            <div className="metrics-grid">
              <MetricCard
                title="Average Salary"
                value={`$${insights.job.average_salary?.toLocaleString() || 0}`}
                icon="💼"
                color="success"
              />
              <MetricCard
                title="Total Employees"
                value={insights.job.employee_count || 0}
                icon="👔"
                color="primary"
              />
              <MetricCard
                title="Job Title"
                value={insights.job.job_title || 'N/A'}
                icon="📋"
                color="info"
              />
            </div>
          </div>
        )}

        <div className="insights-section">
          <h2>Top Earners</h2>
          <div className="top-earners-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Job Title</th>
                  <th>Country</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {insights.topEarners.slice(0, 10).map((employee, index) => (
                  <tr key={employee.id}>
                    <td>{`${employee.first_name} ${employee.last_name}`}</td>
                    <td>{employee.job_title}</td>
                    <td>{employee.country}</td>
                    <td>${employee.salary?.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insights