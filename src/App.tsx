// import LanguageSwitcher from "./components/LanguageSwitcher"
import Home from "./pages/Home";
import { Route, Routes as Switch } from "react-router-dom";
import ErrorPage from "./pages/errors";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import Raffles from "./pages/Raffles";

function App() {
  return (
    <>
      <Switch>
        <Route path="/admin" element={<AuthRoute />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/raffles" element={<Raffles />} />
        <Route path="/*" element={<ErrorPage errorCode={404} />} />
      </Switch>
    </>
  )
}

export default App
