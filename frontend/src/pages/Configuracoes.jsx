import Sidebar from "../components/Sidebar";

export default function Configuracoes() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Configurações</h1>
        <div className="page-panel">
          <p>Área reservada para configurações futuras.</p>
        </div>
      </main>
    </div>
  );
}