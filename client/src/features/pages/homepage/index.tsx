import { useSelector } from 'react-redux';
import { selectAuth } from '../../../auth/authSlice';
import { Carousel } from '../../carousel';
import { Singleton as Authentication } from '../../../auth';
import { useDispatch } from 'react-redux';
import { Button } from '../../button';
import { Spinner } from '../../spinner';

export function Homepage() {
  const { isAuthenticated, isLoading } = useSelector(selectAuth);
  const auth = Authentication.getInstance();
  const clientId = auth.getProp('email');
  const name = String(clientId).split('@')[0];

  const INITIAL_PARAGRAPH = `
  This website was initially created as a CV public storage, only
  later I started to add functionalities that I find useful myself.
  Certain services can be used publicly: taking for example
  expenses, where you can conviniently keep track of monthly
  expenses and subsciptions that perhaps you might not want to keep
  any more. I also post stuff about programming or just interesting piece 
  of personal experience. Other services are in progress. 
  I am open to work in new projects, so therefore
  feel free to reach me anytime, cya 👋`;

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
        <h3
          style={{ textAlign: 'center', margin: '-30px 0 30px 0' }}
          className="homepage-group homepage-group-banner-h3"
        >
          ⚠️ Work in progress, some features might be out of service.
        </h3>

        <div className="homepage-group homepage-group--1">
          <div className="homepage-text-container-title--XXXL">
            Welcome {name==='false'?'guest':name}
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
            Antonio Guiotto
          </div>
          <img src="https://antonioguiotto-images.s3.amazonaws.com/me2.png" alt="Antonio Guiotto" />
          <p>Full Stack Javascript Developer</p>
          <Button
            customStyle={{ width: '300px', marginRight: '20px' }}
            handleClick={() => handleDownloadFile('pdf')}
            label="⤵️ DOWNLOAD PDF 📄"
          />
        </div>
      </div>
    );
  };

  const renderOutsider = () => {
    return (
      <div className="homepage-container">
        
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
