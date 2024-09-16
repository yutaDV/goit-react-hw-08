import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from './components/Layout/Layout';
import Loader from './components/Loader/Loader';
import { selectAuthIsRefreshing } from './redux/auth/selectors';
import { refreshUser } from './redux/auth/operations';
import { Toaster } from 'react-hot-toast';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
import PrivateRoute from './components/Routes/PrivateRoute';
import RestrictedRoute from './components/Routes/RestrictedRoute';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginePage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage')
);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const isRefreshing = useSelector(selectAuthIsRefreshing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshing ? (
        <Loader />
      ) : (
        <>
          <Layout>
            <main>
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/contacts"
                    element={<PrivateRoute component={<ContactsPage />} />}
                  />
                  <Route
                    path="/login"
                    element={<RestrictedRoute component={<LoginPage />} />}
                  />
                  <Route
                    path="/register"
                    element={
                      <RestrictedRoute component={<RegistrationPage />} />
                    }
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
          </Layout>
        </>
      )}
      <Toaster />
    </>
  );
};
export default App;