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

  const INITIAL_PARAGRAPH = `
  This website was initially created as a CV public storage, only
  later I started to add functionalities that I find useful myself.
  Certain services can be used publicly: taking for example
  expenses, where you can conviniently keep track of monthly
  expenses and subsciptions that perhaps you might not want to keep
  any more. I also post stuff about programming or just interesting piece 
  of personal experience. Other services are in progress like the visited countries, 
  where you can keep track of he countries you have been visiting. Finally I'm always up to make
  new friends and I am open to work in new projects, so therefore
  feel free to reach me anytime writing at my support email that you
  can find on my footer. Stay cool 👋`

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
            {INITIAL_PARAGRAPH}
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
      <>
        <h3
          style={{ textAlign: 'center', margin: '-30px 0 30px 0' }}
          className="homepage-group homepage-group-banner-h3"
        >
          ⚠️ Work in progress, some features might be out of service, also
          register and login to have a fuller experience.
        </h3>

        <div className="homepage-text-container-title">
          <div className="homepage-group homepage-group--1">
            <div className="homepage-text-container-title--XXXL">
              Welcome guest
            </div>
            <div className="homepage-text-container-paragraph">
              {INITIAL_PARAGRAPH}
            </div>
          </div>
        </div>
        <div className="homepage-group homepage-group--3">
          <div className="homepage-text-container-title--XXL force-shadow">
            Take a look around
          </div>
          <div className="homepage-big-buttons">
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
                onClick={() => dispatch(changeRoute('/portfolio'))}
                className="homepage-big-button-container"
              >
                <div className="homepage-big-button-container-image">🕰</div>
                <div className="homepage-big-button-container-title">
                  A. Guiotto - CV
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
            </div>
            <div className="homepage-big-buttons__group">
                <div
                  // onClick={() => dispatch(changeRoute('/expenses'))}
                  className="homepage-big-button-container disabled"
                >
                  <div className="homepage-big-button-container-image">💸</div>
                  <div className="homepage-big-button-container-title">
                    My Montly Expenses
                  </div>
                </div>

                <div
                  // onClick={() => dispatch(changeRoute('/map'))}
                  className="homepage-big-button-container disabled"
                >
                  <div className="homepage-big-button-container-image">📍</div>
                  <div className="homepage-big-button-container-title">
                    My Visited Countries
                  </div>
                </div>
                <div
                  // onClick={() => dispatch(changeRoute('/account'))}
                  className="homepage-big-button-container disabled"
                >
                  <div className="homepage-big-button-container-image">🙋🏻‍♂️</div>
                  <div className="homepage-big-button-container-title">
                    My Account
                  </div>
                </div>
              </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="homepage-wrapper">
      {isAuthenticated ? renderInsider() : renderOutsider()}
    </div>
  );
}
