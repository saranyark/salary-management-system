import { useState, useEffect } from 'react'
import apiService from '../../services/api'
import MetricCard from '../Common/MetricCard'
import './Dashboard.css'

function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    averageSalary: 0,
    totalSalary: 0,
    medianSalary: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [employeesRes, insightsRes] = await Promise.all([
        apiService.getEmployees({ per_page: 1 }), // Just get meta data for count
        apiService.getGlobalInsights()
      ])

      setStats({
        totalEmployees: employeesRes.meta?.total || employeesRes.data?.length || 0,
        averageSalary: insightsRes.average_salary || 0,
        totalSalary: insightsRes.total_salary || 0,
        medianSalary: insightsRes.median_salary || 0
      })
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your organization's salary data and employee statistics</p>
      </div>

      <div className="metrics-grid">
        <MetricCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon="👥"
          color="primary"
        />
        <MetricCard
          title="Average Salary"
          value={`$${stats.averageSalary.toLocaleString()}`}
          icon="💰"
          color="success"
        />
        <MetricCard
          title="Total Salary Budget"
          value={`$${stats.totalSalary.toLocaleString()}`}
          icon="📊"
          color="warning"
        />
        <MetricCard
          title="Median Salary"
          value={`$${stats.medianSalary.toLocaleString()}`}
          icon="📈"
          color="info"
        />
      </div>
    </div>
  )
}

export default Dashboard