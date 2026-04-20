import './MetricCard.css'

function MetricCard({ title, value, icon, color = 'primary' }) {
  return (
    <div className={`metric-card metric-card--${color}`}>
      <div className="metric-card__icon">
        {icon}
      </div>
      <div className="metric-card__content">
        <h3 className="metric-card__title">{title}</h3>
        <p className="metric-card__value">{value}</p>
      </div>
    </div>
  )
}

export default MetricCard