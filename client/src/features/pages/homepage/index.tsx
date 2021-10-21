import { useSelector } from 'react-redux';
import { selectAuth } from '../../../auth/authSlice';
import { Carousel } from '../../carousel';
import { Singleton as Authentication } from '../../../auth';
import { useDispatch } from 'react-redux';
import { changeRoute } from '../../routes';
import { useEffect } from 'react';

export function Homepage() {
  const { isAuthenticated } = useSelector(selectAuth);
  const auth = Authentication.getInstance();
  const clientId = auth.getProp('email');
  const name = String(clientId).split('@')[0];
  const dispatch = useDispatch();

  const renderInsider = () => {
    return (
      <div className="homepage-container">
        <h3
          style={{ textAlign: 'center', margin: '-30px 0 30px 0' }}
          className="homepage-group homepage-group-banner-h3"
        >
          ⚠️ Work in progress, some features might be out of service.
        </h3>

        

        <div className="homepage-group homepage-group--1">
          <div className="homepage-text-container-title--XXXL">
            Welcome {name}
          </div>
          <div className="homepage-text-container-paragraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id ea
            repellendus reiciendis voluptate quisquam. Saepe nobis quidem, aut
            velit minima atque error reprehenderit deleniti consectetur et
            commodi hic sequi blanditiis?
          </div>
        </div>

        <div className="homepage-group homepage-group--2">
          <div className="homepage-text-container-title--XXL force-shadow">
            Latest posts
          </div>
          <div className="homepage-carousel-container">
            <Carousel />
          </div>
        </div>

        <div className="homepage-group homepage-group--3">
          <div className="homepage-text-container-title--XXL force-shadow">
            Take a look around
          </div>
          <div className="homepage-big-buttons">
            <div className="homepage-big-buttons__group">
              <div
                onClick={() => dispatch(changeRoute('/expenses'))}
                className="homepage-big-button-container"
              >
                <div className="homepage-big-button-container-image">💸</div>
                <div className="homepage-big-button-container-title">
                  My Montly Expenses
                </div>
              </div>
              <div
                onClick={() => dispatch(changeRoute('/map'))}
                className="homepage-big-button-container"
              >
                <div className="homepage-big-button-container-image">📍</div>
                <div className="homepage-big-button-container-title">
                  My Visited Countries
                </div>
              </div>
              <div
                onClick={() => dispatch(changeRoute('/account'))}
                className="homepage-big-button-container"
              >
                <div className="homepage-big-button-container-image">🙋🏻‍♂️</div>
                <div className="homepage-big-button-container-title">
                  My Account
                </div>
              </div>
            </div>
            <div className="homepage-big-buttons__group">
              <div
                onClick={() => dispatch(changeRoute('/artwork'))}
                className="homepage-big-button-container"
              >
                <div className="homepage-big-button-container-image">🎨</div>
                <div className="homepage-big-button-container-title">
                  A. Guiotto Artworks
                </div>
              </div>
              <div
                onClick={() => dispatch(changeRoute('/posts'))}
                className="homepage-big-button-container"
              >
                <div className="homepage-big-button-container-image">📝</div>
                <div className="homepage-big-button-container-title">
                  A. Guiotto Posts
                </div>
              </div>
              <div
                onClick={() => dispatch(changeRoute('/portfolio'))}
                className="homepage-big-button-container"
              >
                <div className="homepage-big-button-container-image">🕰</div>
                <div className="homepage-big-button-container-title">
                  A. Guiotto - CV
                </div>
              </div>
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
