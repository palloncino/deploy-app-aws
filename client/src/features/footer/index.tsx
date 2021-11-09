import { version } from '../../../package.json';

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-content-textual">
          Credits: <span>Antonio Guiotto</span>
        </div>
        <div className="footer-content-textual">
          Support:{' '}
          <span>powerhydratoni@gmail.com</span>
        </div>
        <div className="footer-content-textual">
          App: <span>v{version}</span>
        </div>
      </div>
      <div className="footer-container-hidden-twin"></div>
    </div>
  );
};
