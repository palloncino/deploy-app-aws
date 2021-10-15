import { useSelector } from 'react-redux';
import { selectAuth } from '../../../auth/authSlice';
import { Singleton as Authentication } from '../../../auth';

export function Homepage() {
  const { isAuthenticated } = useSelector(selectAuth);
  const auth = Authentication.getInstance();
  const clientId = auth.getProp('email');
  const name = String(clientId).split('@')[0];

  const renderInsider = () => {
    return (
      <div className="homepage-text-container">
        <div className="homepage-text-container-title">Welcome {name}</div>
        <div>
          <h3>
            ⚠️ Work in progress, some features might be out of service.
          </h3>
        </div>
      </div>
    );
  };

  const renderOutsider = () => {
    return (
      <div className="homepage-text-container-title">
        Login to have a full experience
      </div>
    );
  };

  return (
    <div className="homepage-container">
      {isAuthenticated ? renderInsider() : renderOutsider()}
    </div>
  );
}
