import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, selectIsOpen } from './menuSlice';
import { changeRoute } from '../routes';
import { Button } from '../button';
import { Singleton as Authorization } from '../../auth';
import { selectAuth } from '../../auth/authSlice';
import { Login } from '../login';
import { Register } from '../register';

export function Menu() {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const { isAuthenticated } = useSelector(selectAuth);
  const auth = Authorization.getInstance();
  const clientId = auth.getProp('email');

  const isAdmin = () => {
    if (clientId === process.env.REACT_APP_ADMIN_EMAIL) return true;
    return false;
  };

  const handleOpenMenu = () => {
    dispatch(toggleMenu());
  };

  const handleDirect = (path: string) => {
    dispatch(changeRoute(path));
  };

  const renderNavigationOptions = () => {
    let menuItems;
    if (isAdmin()) {
      menuItems = [
        { label: '🏠 Homepage', path: '/', disabled: false },
        // { label: '🗂 Portfolio', path: '/portfolio', disabled: false },
        // { label: '🎨 Artworks', path: '/artwork', disabled: false },
        { label: '🏞 Posts', path: '/posts', disabled: false },
        // { label: '📍 Map', path: '/map', disabled: false },
        { label: '💸 Expenses', path: '/expenses', disabled: false },
        { label: '🙋🏻‍♂️ Account', path: '/account', disabled: false },
      ];
    } else {
      if (isAuthenticated) {
        menuItems = [
          { label: '🏠 Homepage', path: '/', disabled: false },
          // { label: '🗂 Portfolio', path: '/portfolio', disabled: false },
          // { label: '🎨 Artworks', path: '/artwork', disabled: false },
          { label: '🏞 Posts', path: '/posts', disabled: false },
          // { label: '📍 Map', path: '/map', disabled: false },
          { label: '💸 Expenses', path: '/expenses', disabled: false },
          { label: '🙋🏻‍♂️ Account', path: '/account', disabled: false },
        ];
      } else {
        menuItems = [
          { label: '🏠 Homepage', path: '/', disabled: false },
          // { label: '🗂 Portfolio', path: '/portfolio', disabled: false },
          // { label: '🎨 Artworks', path: '/artwork', disabled: false },
          { label: '🏞 Posts', path: '/posts', disabled: false },
          // { label: '📍 Map', path: '/map', disabled: true },
          { label: '💸 Expenses', path: '/expenses', disabled: true },
          { label: '🙋🏻‍♂️ Account', path: '/account', disabled: true },
        ];
      }
    }
    return (
      <div className="menu-items-container">
        {/* {menuItems.map(({ path, label, disabled }, index) => {
          const menuButtonStyle = {
            background: '#fff',
            height: '40px',
            marginBottom: '10px',
            border: '1px solid',
          };
          return (
            <Button
              key={index}
              disabled={disabled}
              customStyle={
                disabled ? { ...menuButtonStyle } : { ...menuButtonStyle }
              }
              handleClick={() => handleDirect(path)}
              label={disabled ? `🔒 ${label.split(' ')[1]}` : `${label}`}
            />
          );
        })} */}
        <>
          <div className="header-user-space--2__container__item">
            <Login
              // isOpen={openModals.login}
              // setOpenModals={handleSetOpenModals}
              isOpen={false}
              setOpenModals={() => {}}
            />
          </div>
          <div className="header-user-space--2__container__item">
            <Register
              // isOpen={openModals.register}
              // setOpenModals={handleSetOpenModals}
              isOpen={false}
              setOpenModals={() => {}}
            />
          </div>
          <div className="header-user-space--2__container__item">
          {/* <Button handleClick={() => handleDownloadFile('pdf')} label="Download CV" className="portfolio2__group portfolio2__group--2__button-container__btn-header" /> */}
          <Button handleClick={() => {}} label="Download CV" className="portfolio2__group portfolio2__group--2__button-container__btn-header" />
          </div>
        </>


      </div>
    );
  };

  return (
    <div className="menu-container">
      <Button className="btn btn__default btn--w100" handleClick={handleOpenMenu} label={isOpen ? 'Close' : 'Menu'} />
      {isOpen && (
        <div
          onClick={() => dispatch(toggleMenu())}
          className="menu-overlay"
        ></div>
      )}
      {isOpen && renderNavigationOptions()}
    </div>
  );
}
