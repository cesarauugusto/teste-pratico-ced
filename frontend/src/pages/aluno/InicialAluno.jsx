import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardCard from "../../components/DashboardCard";

export default function InicialAluno() {
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Inicial</h1>

        <div className="grid-cards">
          <DashboardCard
            icon="📚"
            title="Atividades"
            description="Veja as atividades disponíveis e responda cada uma delas."
            onClick={() => navigate("/aluno/atividades")}
          />

          <DashboardCard
            icon="✅"
            title="Atividades Corrigidas"
            description="Visualize notas e feedbacks enviados pelo professor."
            onClick={() => navigate("/aluno/corrigidas")}
          />
        </div>
      </main>
    </div>
  );
}