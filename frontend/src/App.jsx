import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import PrivateRoute from "./auth/PrivateRoute";

import Login from "./pages/Login";
import Configuracoes from "./pages/Configuracoes";

import InicialAluno from "./pages/aluno/InicialAluno";
import ListaAtividades from "./pages/aluno/ListaAtividades";
import ResponderAtividade from "./pages/aluno/ResponderAtividade";
import AtividadesCorrigidas from "./pages/aluno/AtividadesCorrigidas";

import InicialProfessor from "./pages/professor/InicialProfessor";
import CriarAtividade from "./pages/professor/CriarAtividade";
import CorrigirRespostas from "./pages/professor/CorrigirRespostas";
import HistoricoProfessor from "./pages/professor/HistoricoProfessor";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/configuracoes"
            element={
              <PrivateRoute>
                <Configuracoes />
              </PrivateRoute>
            }
          />

          <Route
            path="/aluno"
            element={
              <PrivateRoute>
                <InicialAluno />
              </PrivateRoute>
            }
          />
          <Route
            path="/aluno/atividades"
            element={
              <PrivateRoute>
                <ListaAtividades />
              </PrivateRoute>
            }
          />
          <Route
            path="/aluno/responder/:id"
            element={
              <PrivateRoute>
                <ResponderAtividade />
              </PrivateRoute>
            }
          />
          <Route
            path="/aluno/corrigidas"
            element={
              <PrivateRoute>
                <AtividadesCorrigidas />
              </PrivateRoute>
            }
          />

          <Route
            path="/professor"
            element={
              <PrivateRoute>
                <InicialProfessor />
              </PrivateRoute>
            }
          />
          <Route
            path="/professor/criar"
            element={
              <PrivateRoute>
                <CriarAtividade />
              </PrivateRoute>
            }
          />
          <Route
            path="/professor/corrigir"
            element={
              <PrivateRoute>
                <CorrigirRespostas />
              </PrivateRoute>
            }
          />
          <Route
            path="/professor/atividades"
            element={
              <PrivateRoute>
                <HistoricoProfessor />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}