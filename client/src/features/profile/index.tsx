import { useSelector } from 'react-redux';
import { selectAuth } from '../../auth/authSlice';
import { Singleton as Authorization } from '../../auth';

export const Profile = ({
  avatarUrl = `${process.env.REACT_APP_DEFAULT_AVATAR_IMAGE}`,
}: any) => {
  const { isAuthenticated } = useSelector(selectAuth);
  const auth = Authorization.getInstance();

  const clientId = auth.getProp('email');

  return (
    <div className="profile-container">
      {isAuthenticated ? (
        <div className="profile-box">
          <div className="profile-box-textual">
            <div>{clientId}</div>
          </div>
          <div className="profile-box-logo">
            <img
              className="profile-box-logo-img"
              src={avatarUrl}
              alt="avatar"
            />
          </div>
        </div>
      ) : (
        <div className="profile-box">
          <span className="profile-box-textual">Guest</span>
          <div className="profile-box-logo">
            <img
              className="profile-box-logo-img"
              src={process.env.REACT_APP_DEFAULT_AVATAR_IMAGE}
              alt="avatar"
            />
          </div>
        </div>
      )}
    </div>
  );
};
