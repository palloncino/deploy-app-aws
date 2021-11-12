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
            Introduction to the man
          </div>
          <div className="portfolio2__group portfolio2__group--2__subtitle">
            Who am I
          </div>
          <div className="portfolio2__group portfolio2__group--2__description">
            I am an Italian man, but I love to talk in english and explore new cultures.
          </div>

          <div className="portfolio2__group portfolio2__group--2__subtitle">
            About me
          </div>
          <div className="portfolio2__group portfolio2__group--2__description">
            Very active and sporty guy, in my youth I've got the chance to develop as a musician and as a visual artist.
            Developing application is one of many things that I like to do.
            I have a calm temper and I like to focus on my work.
          </div>

          <div className="portfolio2__group portfolio2__group--2__subtitle">
            My job
          </div>
          <div className="portfolio2__group portfolio2__group--2__description">
            Since 2018 I am working as a Web Developer, I take care of all sides of web applications, meaning #front-end #back-end #dev-ops #project-managment #business-logic #graphic-design #content-manager #creator
          </div>

          <div className="portfolio2__group portfolio2__group--2__subtitle">
            Downloads
          </div>
          <div className="portfolio2__group portfolio2__group--2__button__container">
            <Button handleClick={() => handleDownloadFile('pdf')} label="Download CV" className="portfolio2__group portfolio2__group--2__button-container__btn" />
          </div>
        </div>
      </div>
    </div>
  );
}