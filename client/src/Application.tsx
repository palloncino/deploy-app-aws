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
import 'react-whatsapp-chat-widget/index.css';
import { ErrorPage } from './features/pages/error';
import {
  setAuthentication,
  setAuthLoading,
  selectAuthIsLoading,
} from './auth/authSlice';
import { Singleton as Authentication } from './auth';
import { useEffect } from 'react';
// @ts-ignore
import WhatsAppWidget from 'react-whatsapp-chat-widget';

export function Application() {
  const route = useSelector(selectRoute);
  const isLoading = useSelector(selectAuthIsLoading);

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
      <div className="spinner-container spinner-container__homepage">
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

    const getIconSize = (width: number) => {
      if (width >= 2200) {
        return "200"
      } else if (width < 2200 && width > 1700) {
        return "150"
      } else if (width < 1700 && width > 1300) {
        return "100"
      }
    }

    return (
      <>
        {isLoading ? (
          renderSpinner()
        ) : (
          <div className="page-wrapper">
            <div className="page-container">
              <Header />
              {returnView(route)}
              <WhatsAppWidget
                phoneNo="00393474943221"
                autoOpenTimer={5000}
                iconSize={getIconSize(window.innerWidth)}
                headerTitle="Antonio Guiotto"
                headerCaption="Online"
                iconColor="#34944f"
			          iconBgColor="transparent"
              />
            </div>
          </div>
        )}
      </>
    );
  };

  return <>{renderApplication()}</>;
}
