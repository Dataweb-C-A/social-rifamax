import { Suspense, lazy } from 'react';
import { Route, Routes as Switch } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Loading from './components/Loading';

const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./pages/errors"));
const Login = lazy(() => import("./pages/Login"));
const Raffles = lazy(() => import('./pages/Raffles'));
const Rafflesi = lazy(() => import('./pages/MPI'));
const DevStats = lazy(() => import("./pages/DevStats"));
// const Passport = lazy(() => import("./pages/Passport"));
const Profile = lazy(() => import("./pages/Profile"));
const Gate = lazy(() => import("./pages/Gate"));
const Coupon = lazy(() => import("./pages/Coupon"));

function App() {
  return (
    <Suspense fallback={<Loading full message="Loading..." />}>
      <Switch>
        <Route path="/" element={<Coupon />} />
        <Route path="raffles" element={<Raffles />}>
        </Route>
        <Route path="gate" element={<Gate />} />
        <Route path="coupon" element={<Coupon />} />
        <Route path="rafflesi" element={<Rafflesi />} />
        <Route path="admin" element={<AuthRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<Home />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="dev" element={<AuthRoute />}>
          <Route path="stats" element={<DevStats />} />
        </Route>
        <Route path="/*" element={<ErrorPage errorCode={404} />} />
      </Switch>
    </Suspense>
  )
}

export default App;