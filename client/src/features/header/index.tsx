import { Register } from '../register';
import { Login } from '../login';
import { Breadcrumb } from '../breadcrumb';
import { Profile } from '../profile';
import { Menu } from '../menu';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../auth/authSlice';
import { Singleton as Authorization } from '../../auth';
import { Spinner } from '../spinner';
import { useState } from 'react';
import { changeRoute } from '../routes';
import logo from '../../images/svg/logo-1-double.svg';

export function Header() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth);
  const auth = Authorization.getInstance();
  const dispatch = useDispatch();

  const openModalsInitialState = { login: false, register: false };
  const [openModals, setOpenModals] = useState(openModalsInitialState);

  const clientId = auth.getProp('email');

  const isAdmin = () =>
    clientId === process.env.REACT_APP_ADMIN_EMAIL ? true : false;

  const handleSetOpenModals = (key: string, value: boolean) =>
    setOpenModals({ ...openModalsInitialState, [key]: value });

  const renderSpinner = () => {
    return (
      <div
        className="header-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="spinner-container">
          <Spinner />
        </div>
      </div>
    );
  };

  const renderNavigation = () => {
    return (
      <>
        <div className="header-container">
          <div className="header-user-space-1 header-user-space-1--logo">
            <img
              onClick={() => {
                dispatch(changeRoute('/'));
              }}
              height="50"
              src={logo}
              alt="logo"
            />
          </div>

          <div className="header-user-space-1">
            <Breadcrumb />
          </div>

          <div className="header-logo-space-1">
            <div className="header-logo-space-1-2-logo">
              <div className="header-logo-space-1-2-logo-inner">
                {isAuthenticated && '✍🏻'}
                {!isAuthenticated && '👁'}
              </div>
            </div>

            <div className="header-logo-space-1-2-textual">
              {isAuthenticated &&
                (isAdmin() ? (
                  <div className="header-logo-space-1-2-textual-box">
                    <div className="header-logo-space-1-2-textual-box-title">
                      You are the admin.
                    </div>
                    <div className="header-logo-space-1-2-textual-box-subtitle"></div>
                  </div>
                ) : (
                  <div className="header-logo-space-1-2-textual-box">
                    <div className="header-logo-space-1-2-textual-box-subtitle">
                      You have write permissions.
                    </div>
                  </div>
                ))}

              {!isAuthenticated && (
                <div className="header-logo-space-1-2-textual-box">
                  <div className="header-logo-space-1-2-textual-box-subtitle">
                    You have limited read permissions.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="header-user-space-1">
            <div className="header-user-space-2-profile-container">
              <Profile />
            </div>

            <div className="header-user-space-2-buttons-container">
              {!isAuthenticated ? (
                <>
                  <Login
                    isOpen={openModals.login}
                    setOpenModals={handleSetOpenModals}
                  />
                  <Register
                    isOpen={openModals.register}
                    setOpenModals={handleSetOpenModals}
                  />
                  <Menu />
                </>
              ) : (
                <Menu />
              )}
            </div>
          </div>
        </div>
        <div className="header-container-hidden-twin">
          I
        </div>
      </>
    );
  };

  return isLoading ? renderSpinner() : renderNavigation();
  // return renderNavigation();
}
