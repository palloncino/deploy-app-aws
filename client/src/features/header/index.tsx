import { Register } from '../register';
import { Login } from '../login';
import { Profile } from '../profile';
import { Button } from '../button';
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

  const handleDownloadFile = async (type: 'png' | 'pdf' | 'docx') => {
    switch (type) {
      case 'pdf':
        window.open(`${process.env.REACT_APP_PORTFOLIO_S3_PATH}`, '_blank');
        break;

      default:
        break;
    }
  };

  const renderNavigation = () => {
    return (
      <>
        <div className="header-container">
          {isLoading ? (
            renderSpinner()
          ) : (
            <div className="header-container">

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

              <div className="header-user-space__burger-container">
                BURGHER
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
                      <div className="header-user-space--2__container__item">
                        <Button handleClick={() => handleDownloadFile('pdf')} label="Download CV" className="portfolio2__group portfolio2__group--2__button-container__btn-header" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="header-user-space--2__container__item">
                        <Button handleClick={() => dispatch(changeRoute('/account'))} label="Account" customStyle={{ background: 'transparent', color: 'white' }} />
                      </div>
                      <div className="header-user-space--2__container__item">
                        <Button handleClick={() => handleDownloadFile('pdf')} label="Download CV" className="portfolio2__group portfolio2__group--2__button-container__btn-header" />
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          )}
        </div>
        <div className="header-container-hidden-twin"></div>
      </>
    );
  };

  return renderNavigation();
}
