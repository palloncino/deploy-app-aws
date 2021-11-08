import { useSelector } from 'react-redux';
import { selectAuth } from '../../../auth/authSlice';
import { Singleton as Authentication } from '../../../auth';
import { Button } from '../../button';
import { Spinner } from '../../spinner';

export function Homepage() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth);
  const auth = Authentication.getInstance();
  const clientId = auth.getProp('email');
  const name = String(clientId).split('@')[0];

  const parseNameValue = (name: string | undefined | false | null) => {
    if (typeof name === 'string' && name !== 'undefined' && name !== 'false') {
      return name;
    }
    return 'guest';
  };

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

        {/* <div className="homepage-group homepage-group--1">
          <div className="homepage-group--1--left">
            <div className="homepage-text-container-title--XXXL">
              Welcome {parseNameValue(name)}
            </div>
            <div className="homepage-typewriter-wrapper">
              This website was initially created as a CV public storage, only
              later I started to add functionalities that I find useful myself.
              Certain services can be used publicly: taking for example
              expenses, where you can conviniently keep track of monthly
              expenses and subsciptions that perhaps you might not want to keep
              any more. I also post stuff about programming or just interesting
              piece of personal experience. Other services are in progress.
              Finally I wanna say, I am open to work in new projects, so
              therefore feel free to reach me anytime, cya 👋
            </div>
          </div>
        </div> */}

        {/* <br /><br /> */}

        <div className="homepage-group homepage-group--3">
          <p>Antonio Guiotto, Software Developer</p>
          {/* <img
            src="https://antonioguiotto-images.s3.amazonaws.com/me3.png"
            alt="Antonio Guiotto"
            className="homepage-group--3--img"
            style={{ marginBottom: '20px' }}
          /> */}
          <Button
            customStyle={{ width: '200px', margin: '0 auto' }}
            handleClick={() => handleDownloadFile('pdf')}
            label="⤵️ DOWNLOAD CV 📄"
          />
        </div>

      </div>
    );
  };

  const renderOutsider = () => {
    return <div className="homepage-container"></div>;
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
