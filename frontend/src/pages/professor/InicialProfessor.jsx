import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import DashboardCard from "../../components/DashboardCard";

export default function InicialProfessor() {
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Inicial</h1>

        <div className="grid-cards">
          <DashboardCard
            icon="📝"
            title="Criar Atividade"
            description="Cadastre atividades para as turmas."
            onClick={() => navigate("/professor/criar")}
          />

          <DashboardCard
            icon="📥"
            title="Corrigir Respostas"
            description="Veja as atividades criadas e depois corrija as respostas dos alunos."
            onClick={() => navigate("/professor/corrigir")}
          />

          <DashboardCard
            icon="📚"
            title="Ver Atividades"
            description="Visualize as atividades criadas, em aberto e já corrigidas."
            onClick={() => navigate("/professor/atividades")}
          />
        </div>
      </main>
    </div>
  );
}