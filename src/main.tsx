import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Navigate } from "react-router-dom";

import { AuthContext, AuthProvider } from "./providers/authProvider.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import { StarProvider } from "./providers/StarProvider.tsx";
import UserProvider from "./providers/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <StarProvider>
        <UserProvider>
        <App />
        </UserProvider>
        </StarProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

const LoginRedirect = () => {
  const authContext = useContext(AuthContext);
  return authContext?.user ? <Navigate to="/" /> : <LoginPage />;
};
