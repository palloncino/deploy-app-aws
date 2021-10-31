import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Singleton as Authentication } from '../../../auth';
import { AccountContent } from './view';
import { removeAuthentication } from '../../../auth/authSlice';
import { changeRoute } from '../../routes';
import { toggleMenu } from '../../menu/menuSlice';

export function Account() {
  const auth = Authentication.getInstance();
  const clientId = auth.getProp('email');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogout = () => {
    auth.removeCookies();
    dispatch(removeAuthentication());
    dispatch(changeRoute('/'));
    dispatch(toggleMenu());
  };

  const handleDeleteAccount = async () => {
    setIsLoading(true);

    const access_token = auth.getProp('token');

    let defaultHeaders = {
      'Content-Type': 'application/json',
    };

    let URL = `${process.env.REACT_APP_SERVER_DOMAIN}/auth/delete-account`;

    let options = {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ email: clientId }),
    };

    try {
      await fetch(URL, options);
      setIsLoading(false);
      handleLogout();
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="account-container">
      <AccountContent
        isLoading={isLoading}
        clientId={clientId}
        handleDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
}
