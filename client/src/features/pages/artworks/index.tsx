export function Artworks() {
  const style: any = {
    container: {
      display: 'flex',
    },
    column: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    columnImg: {
      width: '100%',
      maxWidth: '433px',
    },
  };

  return (
    <div className="artwork-items-container">
      <div className="artwork-items-summary-container">
        <div className="artwork-summary-container">
          <div className="artwork-summary-container-img">
            <img
              className="artwork-summary-container-img"
              src="https://antonioguiotto-artworks.s3.amazonaws.com/images/me.png"
              alt="myself by A. Guiotto"
            />
          </div>
          <div className="artwork-summary-container-text">
            <div className="artwork-summary-container-text-title">
              I've always been passionate about design..
            </div>
            <div className="artwork-summary-container-text-description">
              I attended a school of art in my younger years where I developed a
              technique, although digital artworks came later. I started with a
              tablet that my brother gave me as a present for my birthday. I
              haven't used the tablet for many years before I felt the curiosity
              to use it and see what could I do with it. This happens parallel
              to my beginning as a web developer.
            </div>
          </div>
        </div>
      </div>
      <div className="artwork-items-title">🕰 2018</div>
      <img
        style={{ ...style.columnImg, maxWidth: '100%' }}
        src="https://antonioguiotto-artworks.s3.amazonaws.com/images/sho2.png"
        alt="art by A. Guiotto"
      />
      <div className="artwork-items artwork-items-2018">
        {/* COLUMN 1 */}
        <div style={style.column}>
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/sho.png"
            alt="Sho by A. Guiotto"
          />
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/brodas.png"
            alt="Broda by A. Guiotto"
          />
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/james.png"
            alt="James by A. Guiotto"
          />
        </div>
        {/* COLUMN 2 */}
        <div style={style.column}>
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/conor.png"
            alt="Conor by A. Guiotto"
          />
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/female.png"
            alt="female by A. Guiotto"
          />
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/jp.png"
            alt="J.P. by A. Guiotto"
          />
        </div>
        {/* COLUMN 3 */}
        <div style={style.column}>
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/wes.png"
            alt="Wes Montgomery by A. Guiotto"
          />
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/pablo.png"
            alt="Escobar P. by A. Guiotto"
          />
          <img
            style={style.columnImg}
            src="https://antonioguiotto-artworks.s3.amazonaws.com/images/trevor.png"
            alt="Trevor by A. Guiotto"
          />
        </div>
      </div>
    </div>
  );
}
