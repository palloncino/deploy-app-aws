import { useSelector } from 'react-redux';
import { selectAuth } from '../../../auth/authSlice';
import { Button } from '../../button';
import { Spinner } from '../../spinner';
import { Posts } from '../posts';

export function Homepage() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth);

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

  const renderInsider = () => {
    return (
      <div className="homepage-container">
        <div className="homepage-group homepage-group--1">
          <div className="homepage-group--1__title-container homepage-group--1__title-container--1">
            que paso homie!
          </div>
          <div className="homepage-group--1__title-container homepage-group--1__title-container--2">
            I make websites
          </div>
          <div className="homepage-group--1__title-container homepage-group--1__title-container--3">
            This is what I do 🤷🏻‍♂️
          </div>
        </div>

        <div className="homepage-group homepage-group--2">
          <div className="homepage-group homepage-group--2__1">
            <div className="homepage-group homepage-group--2__1__1">
              <img
                src="https://antonioguiotto-images.s3.amazonaws.com/profile1.webp"
                alt="Antonio Guiotto"
                className="homepage-group homepage-group--2__1__1__img"
              />
            </div>
            <div className="homepage-group homepage-group--2__1__2">

            <div className="homepage-group--2__1__2__common homepage-group--2__1__2__title">
                Antonio Guiotto
              </div>
              <div className="homepage-group--2__1__2__common homepage-group--2__1__2__subtitle">
                Web Developer
              </div>
              <div className="homepage-group--2__1__2__common homepage-group--2__1__2__description">
              cit. "work hard for your dreams"
              </div>
              <Button
                customStyle={{}}
                className="homepage-group--2__1__2__common homepage-group--2__1__2__button"
                handleClick={() => handleDownloadFile('pdf')}
                label="Download CV"
              />
            </div>
          </div>
          <div className="homepage-group homepage-group--2__2">
            <Posts />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="homepage-wrapper">
      {isLoading
        ? renderSpinner()
        : isAuthenticated
        ? renderInsider()
        : renderInsider()}
    </div>
  );
}
