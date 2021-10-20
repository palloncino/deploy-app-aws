import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu, selectIsOpen } from './menuSlice';
import { changeRoute } from '../routes';
import { Button } from '../button';
import { Logout } from '../logout';
import { Singleton as Authorization } from '../../auth';
import { selectAuth } from '../../auth/authSlice';

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

  const styles: any = {
    menuContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '150px',
    },
    menuListItemContainer: {
      padding: '10px',
      width: '100%',
      cursor: 'pointer',
    },
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
        { label: '🏞 Posts', path: '/posts', disabled: false },
        { label: '🗂 Portfolio', path: '/portfolio', disabled: false },
        { label: '💸 Expenses', path: '/expenses', disabled: false },
        { label: '🎨 Artworks', path: '/artwork', disabled: false },
        { label: '📍 Map', path: '/map', disabled: false },
        { label: '🙋🏻‍♂️ Account', path: '/account', disabled: false },
      ];
    } else {
      if (isAuthenticated) {
        menuItems = [
          { label: '🏠 Homepage', path: '/', disabled: false },
          { label: '🏞 Posts', path: '/posts', disabled: false },
          { label: '🗂 Portfolio', path: '/portfolio', disabled: false },
          { label: '💸 Expenses', path: '/expenses', disabled: false },
          { label: '🎨 Artworks', path: '/artwork', disabled: false },
          { label: '📍 Map', path: '/map', disabled: false },
          { label: '🙋🏻‍♂️ Account', path: '/account', disabled: false },
        ];
      } else {
        menuItems = [
          { label: '🏠 Homepage', path: '/', disabled: false },
          { label: '🏞 Posts', path: '/posts', disabled: true },
          { label: '🗂 Portfolio', path: '/portfolio', disabled: false },
          { label: '💸 Expenses', path: '/expenses', disabled: true },
          { label: '🎨 Artworks', path: '/artwork', disabled: false },
          { label: '📍 Map', path: '/map', disabled: true },
          { label: '🙋🏻‍♂️ Account', path: '/account', disabled: true },
        ];
      }
    }
    return (
      <div className="menu-items-container">
        {menuItems.map(({ path, label, disabled }, index) => {
          const menuButtonStyle = {
            textAlign: 'left',
            padding: '0 10px'
          }
          return (
            <Button
              key={index}
              disabled={disabled}
              customStyle={disabled ? { ...menuButtonStyle, color: 'lightgrey' } : { ...menuButtonStyle }}
              handleClick={() => handleDirect(path)}
              label={disabled ? `🔒 ${label.split(' ')[1]}` : `${label}`}
            />
          )
        })}
        {isAuthenticated && <Logout />}
      </div>
    );
  };

  return (
    <div style={styles.menuContainer}>
      <Button handleClick={handleOpenMenu} label={isOpen ? 'CLOSE' : 'MENU'} />
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
