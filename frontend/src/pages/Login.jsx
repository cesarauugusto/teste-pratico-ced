import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);

      if (res.data.user.role === "PROFESSOR") {
        navigate("/professor");
      } else {
        navigate("/aluno");
      }
    } catch (err) {
      if (err.response) {
        const detalhe =
          err.response.data?.detail ||
          err.response.data?.non_field_errors?.[0] ||
          "Falha ao fazer login.";
        setErro(detalhe);
      } else {
        setErro("Servidor indisponível no momento. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Plataforma Escolar</h1>
        <p>Entre com seu email e senha</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {erro && <span className="login-error">{erro}</span>}
      </div>
    </div>
  );
}