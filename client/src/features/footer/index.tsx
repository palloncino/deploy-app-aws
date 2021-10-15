import { version } from '../../../package.json';

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-content-textual">
          Credits: <span className="force-shadow">Antonio Guiotto</span>
        </div>
        <div className="footer-content-textual">
          Support:{' '}
          <span className="force-shadow">powerhydratoni@gmail.com</span>
        </div>
        <div className="footer-content-textual">
          App: <span className="force-shadow">v{version}</span>
        </div>
      </div>
      <div className="footer-container-hidden-twin"></div>
    </div>
  );
};
