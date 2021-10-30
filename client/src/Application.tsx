import { Header } from './features/header';
import { Portfolio } from './features/pages/portfolio';
import { Artworks } from './features/pages/artworks';
import { Homepage } from './features/pages/homepage';
import { Map } from './features/pages/map';
import { Posts } from './features/pages/posts';
import { Account } from './features/pages/account';
import { Expenses } from './features/pages/expenses';
import { Spinner } from './features/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { selectRoute } from './features/routes';
import { Footer } from './features/footer';
import { ErrorPage } from './features/pages/error';
import { setAuthentication, setAuthLoading } from './auth/authSlice';
import { Singleton as Authentication } from './auth';
import { useEffect } from 'react';

export function Application() {
  const route = useSelector(selectRoute);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      dispatch(setAuthLoading(true));

      const auth = Authentication.getInstance();
      const isAuth = await auth.hasAuthCookies();

      if (isAuth) {
        dispatch(setAuthentication());
      }

      setTimeout(() => {
        return dispatch(setAuthLoading(false));
      }, 500);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSpinner = () => {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  };

  const renderApplication = () => {
    if (window.innerWidth <= 600) {
      return (
        <div className="mobile-container">
          Mobile version is not available 😅
        </div>
      );
    }

    const returnView = (route: string) => {
      switch (route) {
        case '/':
          return <Homepage />;

        case '/artwork':
          return <Artworks />;

        case '/portfolio':
          return <Portfolio />;

        case '/expenses':
          return <Expenses />;

        case '/account':
          return <Account />;

        case '/map':
          return <Map />;

        case '/posts':
          return <Posts />;

        case '/404':
          return <ErrorPage />;

        default:
          return renderSpinner(); // handle is Loading { isLoading ? <renderSpinner() : <ErrorPage /> }
      }
    };

    return (
      <>
        <div className="page-wrapper">
          <div className="page-container">
            <Header />
            {returnView(route)}
            <Footer />
          </div>
        </div>
      </>
    );
  };

  return <>{renderApplication()}</>;
}
