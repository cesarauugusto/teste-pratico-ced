import "./DashboardCard.css";

export default function DashboardCard({ icon, title, description, onClick }) {
  return (
    <button className="dashboard-card" onClick={onClick}>
      <div className="dashboard-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </button>
  );
}