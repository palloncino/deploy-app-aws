import { useSelector } from 'react-redux';
import { selectAuth } from '../../../auth/authSlice';
import { Carousel } from '../../carousel';
import { Singleton as Authentication } from '../../../auth';
import { useDispatch } from 'react-redux';
import { changeRoute } from '../../routes';

export function Homepage() {
  const { isAuthenticated } = useSelector(selectAuth);
  const auth = Authentication.getInstance();
  const clientId = auth.getProp('email');
  const name = String(clientId).split('@')[0];
  const dispatch = useDispatch();

  const renderInsider = () => {
    return (
      <div className="homepage-container">
  
        <div className="homepage-group homepage-group--1">
          <h3 className="homepage-group homepage-group-banner-h3">⚠️ Work in progress, some features might be out of service.</h3>
          <div className="homepage-text-container-title--XXXL">
            Welcome {name}
          </div>
          <div className="homepage-text-container-paragraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id ea repellendus reiciendis voluptate quisquam. Saepe nobis quidem, aut velit minima atque error reprehenderit deleniti consectetur et commodi hic sequi blanditiis?
          </div>
        </div>

        <div className="homepage-group homepage-group--2">
          <div className="homepage-text-container-title--XXL">Latest posts</div>
          <div className="homepage-carousel-container">
            <Carousel />
          </div>
        </div>

        <div className="homepage-group homepage-group--3">
          <div className="homepage-text-container-title--XXL">
            Take a look around
          </div>
          <div className="homepage-big-buttons">
            <div id="expenses" onClick={() => dispatch(changeRoute('/expenses'))} className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>Manage your expenses</h3>
              </div>
              <div className="homepage-big-button-container-image">💸</div>
            </div>
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>Visited countries</h3>
              </div>
              <div className="homepage-big-button-container-image">📍</div>
            </div>
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>A. G. Artworks</h3>
              </div>
              <div className="homepage-big-button-container-image">🎨</div>
            </div>
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>All my posts</h3>
              </div>
              <div className="homepage-big-button-container-image">📝</div>
            </div>
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>Account</h3>
              </div>
              <div className="homepage-big-button-container-image">🙋🏻‍♂️</div>
            </div>
            <div className="homepage-big-button-container">
              <div className="homepage-big-button-container-title">
                <h3>CV - Curriculum Vitae</h3>
              </div>
              <div className="homepage-big-button-container-image">🕰</div>
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
