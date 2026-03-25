import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { api } from "../../api/client";

export default function CriarAtividade() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [turma, setTurma] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [turmas, setTurmas] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

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
    setMensagem("");
    setErro("");

    try {
      await api.post("/atividades", {
        titulo,
        descricao,
        turma: Number(turma),
        data_entrega: dataEntrega,
      });

      setMensagem("Atividade criada com sucesso.");
      setTitulo("");
      setDescricao("");
      setTurma("");
      setDataEntrega("");
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

            <input
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />

            <button type="submit" className="action-btn">
              Criar Atividade
            </button>
          </form>

          {mensagem && <p className="success-text">{mensagem}</p>}
          {erro && <p className="error-text">{erro}</p>}
        </div>
      </main>
    </div>
  );
}