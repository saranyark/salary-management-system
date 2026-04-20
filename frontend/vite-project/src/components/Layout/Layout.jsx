import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Sidebar() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/insights', label: 'Insights', icon: '📈' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Salary Manager</h2>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <h1>HR Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Admin</span>
        </div>
      </div>
    </header>
  )
}

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout