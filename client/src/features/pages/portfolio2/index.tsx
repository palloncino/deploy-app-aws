import { Button } from '../../button';

export function Portfolio2() {

  const handleDownloadFile = async (type: 'png' | 'pdf' | 'docx') => {
    switch (type) {
      case 'pdf':
        window.open(`${process.env.REACT_APP_PORTFOLIO_S3_PATH}`, '_blank');
        break;

      default:
        break;
    }
  };

  return (
    <div className="portfolio2__wrapper">
      <div className="portfolio2__container">
        <div className="portfolio2__group portfolio2__group--1">
          <img src="https://antonioguiotto-images.s3.amazonaws.com/profile1.png" alt="" className="portfolio2__group portfolio2__group--1__img"/>
        </div>
        <div className="portfolio2__group portfolio2__group--2">
          <div className="portfolio2__group portfolio2__group--2__title">
            Antonio Guiotto
          </div>
          <div className="portfolio2__group portfolio2__group--2__subtitle">
            Web Developer
          </div>
          <div className="portfolio2__group portfolio2__group--2__description">
            I had only this small blurred pic, there you go!
          </div>
          <div className="portfolio2__group portfolio2__group--2__button__container">
            <Button handleClick={() => handleDownloadFile('pdf')} label="Download CV" className="portfolio2__group portfolio2__group--2__button-container__btn" />
          </div>
        </div>
      </div>
    </div>
  );
}
