import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api/client";

export default function CriarAtividade() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [turma, setTurma] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [turmas, setTurmas] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function carregarTurmas() {
      try {
        const res = await api.get("/turmas");
        setTurmas(res.data);
      } catch {
        setErro("Erro ao carregar turmas.");
      }
    }

    carregarTurmas();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      await api.post("/atividades", {
        titulo,
        descricao,
        turma: Number(turma),
        data_entrega: dataEntrega,
      });

      alert("Atividade criada com sucesso.");
      navigate("/professor");
    } catch (err) {
      const detalhe =
        err.response?.data?.detail || "Erro ao criar atividade.";
      setErro(detalhe);
    }
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="page-content">
        <h1 className="page-title">Criar Atividade</h1>

        <div className="page-panel">
          <form onSubmit={handleSubmit} className="form-block">
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />

            <textarea
              rows={6}
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />

            <select value={turma} onChange={(e) => setTurma(e.target.value)}>
              <option value="">Selecione a turma</option>
              {turmas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>

            <div className="form-group">
              <label>Data de entrega</label>
              <input
                type="date"
                value={dataEntrega}
                onChange={(e) => setDataEntrega(e.target.value)}
              />
            </div>

            <button type="submit" className="action-btn">
              Criar Atividade
            </button>
          </form>

          {erro && <p className="error-text">{erro}</p>}
        </div>
      </main>
    </div>
  );
}