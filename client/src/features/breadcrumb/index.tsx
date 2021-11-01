import { useSelector } from 'react-redux';
import { selectRoute } from '../routes';

export function Breadcrumb() {
  const route = useSelector(selectRoute);

  return (
    <div className="breadcrumb-wrapper">
      {/* <span className="breadcrumb-icon">🧭</span> */}
      {/* {route === '/' ? (
        <span className="breadcrumb-text">HOMEPAGE</span>
      ) : (
        <span className="breadcrumb-text">
          &nbsp;{route.slice(1, route.length).toUpperCase()}
        </span>
      )} */}
    </div>
  );
}
