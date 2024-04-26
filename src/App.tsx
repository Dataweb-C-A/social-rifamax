// import LanguageSwitcher from "./components/LanguageSwitcher"
import Home from "./pages/Home";
import { Route, Routes as Switch } from "react-router-dom";
import ErrorPage from "./pages/errors";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import Raffles from './pages/MP'
import Rafflesi from './pages/MPI'
import DevStats from "./pages/DevStats";

function App() {
  return (
    <>
      <Switch>
        <Route path="raffles" element={<Raffles />} />
        <Route path="rafflesi" element={<Rafflesi />} />
        <Route path="admin" element={<AuthRoute />}>
          <Route path="dashboard" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="dev" element={<AuthRoute />}>
          <Route path="stats" element={<DevStats />} />
        </Route>
        <Route path="/*" element={<ErrorPage errorCode={404} />} />
      </Switch>
    </>
  )
}

export default App
