import { useSelector } from 'react-redux';
import { selectAuth } from '../../../auth/authSlice';
import { Carousel } from '../../carousel';
import { Singleton as Authentication } from '../../../auth';

export function Homepage() {
  const { isAuthenticated } = useSelector(selectAuth);
  const auth = Authentication.getInstance();
  const clientId = auth.getProp('email');
  const name = String(clientId).split('@')[0];

  const renderInsider = () => {
    return (
      <div className="homepage-container">
        <div className="homepage-group homepage-group--1">
          <div className="homepage-text-container-title--XXXL">
            Welcome {name}
          </div>
          <div>
            <h3>⚠️ Work in progress, some features might be out of service.</h3>
          </div>
        </div>

        <div className="homepage-group homepage-group--2">
          <div className="homepage-text-container-title--XXL">
            Latest posts
          </div>
          <Carousel />
        </div>

        <div className="homepage-group homepage-group--3">
          <div className="homepage-text-container-title--XXL">
            Take a look around
          </div>
          <div className="homepage-big-buttons">
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>
                Manage your expenses
                </h3>
              </div>
              <div className="homepage-big-button-container-image">💸</div>
            </div>
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>
                Visited countries
                </h3>
              </div>
              <div className="homepage-big-button-container-image">📍</div>
            </div>
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>
                A. G. Artworks
                </h3>
              </div>
              <div className="homepage-big-button-container-image">🎨</div>
            </div>
          </div>
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
    <div className="homepage-wrapper">
      {isAuthenticated ? renderInsider() : renderOutsider()}
    </div>
  );
}
