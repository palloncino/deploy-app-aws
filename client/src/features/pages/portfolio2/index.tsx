import GuitarSvg2 from '../../../images/svg/guitar2.svg'
import ArtistSvg from '../../../images/svg/artist.svg'

export function Portfolio2() {

  const displaySvgs = (side: number, width: number, src: any) => {

    if (width > 2200) {

      return <img style={{
        position: 'absolute',
        height: '100%',
        [side > 0 ? 'left': 'right']: '-200px',
        bottom: '-200px',
      }} src={src} alt="guitar" />

    } else if (width < 2200 && width > 1700) {

      return <img style={{
        position: 'absolute',
        height: '80%',
        [side > 0 ? 'left': 'right']: '-200px',
        bottom: '-120px',
      }} src={src} alt="guitar" />

    } else if (width < 1700 && width > 1300) {

      return <img style={{
        position: 'absolute',
        height: '80%',
        [side > 0 ? 'left': 'right']: '-50px',
        bottom: '0px',
      }} src={src} alt="guitar" />

    } else {
      return;
    }
  }

  return (
    <div className="portfolio2__wrapper">
      <div className="portfolio2__container">

      
      {displaySvgs(0, window.innerWidth, GuitarSvg2)}


        {/* <div className="portfolio2__group portfolio2__group--1">
          <div className="portfolio2__group--1__container">
            <img src="https://antonioguiotto-images.s3.amazonaws.com/profile1.png" alt="" className="portfolio2__group--1__container__img"/>
            <Button handleClick={() => handleDownloadFile('pdf')} label="Download CV" className="portfolio2__group--1__container__btn" />
          </div>
        </div> */}
        <div className="portfolio2__group portfolio2__group--2">
          <div className="portfolio2__group portfolio2__group--2__title">
            Introduction to the man
          </div>
          <div className="portfolio2__group portfolio2__group--2__subtitle">
            Who am I
          </div>
          <div className="portfolio2__group portfolio2__group--2__description">
            I am an Italian man who loves to talk in english and explore new cultures.
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
            Since 2018 I am working as a Web Developer, I take care of all sides of web applications, therefore you culd define me as &nbsp;
            <span className="portfolio2__group--2__description__hashtag">#front-end</span> 
            <span className="portfolio2__group--2__description__hashtag">#back-end</span>
            <span className="portfolio2__group--2__description__hashtag">#graphic-design</span> 
            <span className="portfolio2__group--2__description__hashtag">#project-manager</span> 
            <span className="portfolio2__group--2__description__hashtag">#business-logic-developer</span> 
            <span className="portfolio2__group--2__description__hashtag">#content-creator</span>  
          </div>

          {displaySvgs(1, window.innerWidth, ArtistSvg)}

          {/* <div className="portfolio2__group portfolio2__group--2__subtitle">
            Downloads
          </div>
          <div className="portfolio2__group portfolio2__group--2__button__container">
            <Button handleClick={() => handleDownloadFile('pdf')} label="Download CV" className="portfolio2__group portfolio2__group--2__button-container__btn" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
