import { Register } from '../register';
import { Login } from '../login';
import { Logout } from '../logout';
import { Profile } from '../profile';
import { Menu } from '../menu';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '../../auth/authSlice';
import { Singleton as Authorization } from '../../auth';
import { Spinner } from '../spinner';
import { useState } from 'react';
import { changeRoute } from '../routes';

export function Header() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth);
  const auth = Authorization.getInstance();
  const dispatch = useDispatch();

  const openModalsInitialState = { login: false, register: false };
  const [openModals, setOpenModals] = useState(openModalsInitialState);

  const handleSetOpenModals = (key: string, value: boolean) =>
    setOpenModals({ ...openModalsInitialState, [key]: value });

  const renderSpinner = () => {
    return (
      <div className="spinner-container">
        <Spinner />
      </div>
    );
  };

  const renderNavigation = () => {
    return (
      <>
        <div className="header-container">
          {isLoading ? (
            renderSpinner()
          ) : (
            <>
              <div className="header-user-space--1">
                <div
                  className="header-user-space--1__logo"
                  onClick={() => {
                    dispatch(changeRoute('/'));
                  }}
                >
                  antonioguiotto.com
                </div>
              </div>

              <div className="header-user-space--2">
                <div className="header-user-space--2__container">
                  <div className="header-user-space--2__container__item header-user-space--2__container__item--profile">
                    <Profile
                      avatarUrl={
                        auth.getProp('avatar_url') === 'undefined' ||
                        !auth.getProp('avatar_url')
                          ? `${process.env.REACT_APP_DEFAULT_AVATAR_IMAGE}`
                          : auth.getProp('avatar_url')
                      }
                    />
                  </div>
                  {!isAuthenticated ? (
                    <>
                      {/* <div className="header-user-space--2__container__item">
                        <Menu />
                      </div> */}
                      <div className="header-user-space--2__container__item">
                        <Login
                          isOpen={openModals.login}
                          setOpenModals={handleSetOpenModals}
                        />
                      </div>
                      <div className="header-user-space--2__container__item">
                        <Register
                          isOpen={openModals.register}
                          setOpenModals={handleSetOpenModals}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* <div className="header-user-space--2__container__item">
                        <Menu />
                      </div> */}
                      <div className="header-user-space--2__container__item">
                        <Logout />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="header-container-hidden-twin"></div>
      </>
    );
  };

  return renderNavigation();
}
