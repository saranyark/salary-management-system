// API service for communicating with the Rails backend
const API_BASE_URL = '/api'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Network error' }))
        
        // Handle errors object (Rails validation errors)
        let errorMessage = `HTTP ${response.status}`
        if (error.errors) {
          if (Array.isArray(error.errors)) {
            errorMessage = error.errors.join(', ')
          } else if (typeof error.errors === 'object') {
            // Convert object errors to readable format: "field: error, field: error"
            errorMessage = Object.entries(error.errors)
              .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
              .join('; ')
          }
        } else if (error.error) {
          errorMessage = error.error
        }
        
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error)
      throw error
    }
  }

  // Employees API
  async getEmployees(params = {}) {
    const queryParams = new URLSearchParams(params).toString()
    const endpoint = queryParams ? `/employees?${queryParams}` : '/employees'
    return this.request(endpoint)
  }

  async getEmployee(id) {
    return this.request(`/employees/${id}`)
  }

  async createEmployee(employeeData) {
    return this.request('/employees', {
      method: 'POST',
      body: JSON.stringify(employeeData)
    })
  }

  async updateEmployee(id, employeeData) {
    return this.request(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employeeData)
    })
  }

  async deleteEmployee(id) {
    return this.request(`/employees/${id}`, {
      method: 'DELETE'
    })
  }

  // Insights API
  async getCountryInsights(country = '') {
    const query = country ? `?country=${encodeURIComponent(country)}` : ''
    return this.request(`/insights/country${query}`)
  }

  async getJobInsights(country = '', jobTitle = '') {
    const params = new URLSearchParams()
    if (country) params.append('country', country)
    if (jobTitle) params.append('job_title', jobTitle)
    const query = params.toString() ? `?${params.toString()}` : ''
    return this.request(`/insights/job${query}`)
  }

  async getTopEarners() {
    return this.request('/insights/top_earners')
  }

  async getGlobalInsights() {
    return this.request('/insights/global')
  }
}

export default new ApiService()