import { useDispatch } from 'react-redux';
import { Button } from '../button';
import { Singleton as Authorization } from '../../auth';
import { removeAuthentication } from '../../auth/authSlice';
import { changeRoute } from '../routes';
import { toggleMenu } from '../menu/menuSlice';

export const Logout = () => {
  const auth = Authorization.getInstance();

  const dispatch = useDispatch();

  const handleLogout = () => {
    // TODO:  open a modal with quote, "are you sure you want to log out?" buttons: cancel, logout
    auth.removeCookies();
    dispatch(removeAuthentication());
    dispatch(changeRoute('/'));
    dispatch(toggleMenu());
    setTimeout(() => window.location.reload(), 0);
  };

  return <Button className="btn btn__danger-button" handleClick={handleLogout} label="Logout" />;
};
