import "./App.css";
import Layout from "./layout/Layout";
import UserProvider from "./providers/UserProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
    <UserProvider>
      <Layout children={<AppRouter />} />
      </UserProvider>
    </>
  );
}

export default App;
