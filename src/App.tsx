import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes as Switch } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import Loading from './components/Loading';
import { useInfluencer } from './hooks/useInfluencer';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = lazy(() => import("./pages/Home"));
const Redirect = lazy(() => import("./pages/Passport"));
const InfluencerError = lazy(() => import("./pages/errors/influencerError"));
const Login = lazy(() => import("./pages/Login"));
const Raffles = lazy(() => import('./pages/Raffles'));
const Rafflesi = lazy(() => import('./pages/MPI'));
const DevStats = lazy(() => import("./pages/DevStats"));
const Profile = lazy(() => import("./pages/Profile"));
const Payments = lazy(() => import("./pages/Payments"));
const Gate = lazy(() => import("./pages/Gate"));
const Coupon = lazy(() => import("./pages/Coupon"));
const CouponAdmin = lazy(() => import("./pages/AdminCoupon"));

interface IPassport {
  component: React.ReactNode;
}

function App() {
  const { search } = useInfluencer();
  const { t } = useTranslation();
  const { influencer } = useInfluencer();

  const location = useLocation();
  const blindPaths = [/^\/login$/, /^\/admin(\/.*)?$/, /^\/dev(\/.*)?$/];
  const isBlind = blindPaths.some((path) => location.pathname.match(path));

  const [isLoadingInfluencer, setIsLoadingInfluencer] = useState<boolean>(!isBlind);

  const Passport = ({ component }: IPassport) => {
    if (isLoadingInfluencer) {
      return <Loading full message={t("loadingInfluencer")} />;
    }

    if (influencer === undefined) {
      return <InfluencerError />;
    }

    if (!isBlind) {
      return component;
    }
  };

  useEffect(() => {
    !isBlind && search(() => setIsLoadingInfluencer(false));
  }, [])

  return (
    <Suspense fallback={<Loading full message={t("loadingPage")} />}>
      <Switch>
        <Route path="/" element={<Passport component={<Coupon />} />} />
        <Route path="raffles" element={<Passport component={<Raffles />} />} />
        <Route path="gate" element={<Passport component={<Gate />} />} />
        <Route path="coupon" element={<Passport component={<Coupon />} />} />
        <Route path="rafflesi" element={<Passport component={<Rafflesi />} />} />
        <Route path="admin" element={<AuthRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="coupon" element={<CouponAdmin />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="payments" element={<Payments />} />
          <Route path="*" element={<Passport component={<Redirect /> } />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="dev" element={<AuthRoute />}>
          <Route path="stats" element={<DevStats />} />
        </Route>
      </Switch>
    </Suspense>
  )
}

export default App;