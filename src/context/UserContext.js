import { createContext, useContext, useState } from "react";

// Cria o contexto
const UserContext = createContext();

// Provider para envolver o App
export function UserProvider({ children }) {
  // Simulação de usuário logado
  const [usuario, setUsuario] = useState({ nome: "Matheus" });

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar o contexto
export function useUser() {
  return useContext(UserContext);
}
