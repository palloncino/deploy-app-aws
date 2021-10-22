import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CarouselContent } from './view';
import { changeRoute, setFocusItemId } from '../routes';
import { getPosts } from '../pages/posts/postsSLice'
import { useSelector } from 'react-redux';
import { selectPosts } from '../pages/posts/postsSLice';
import { Spinner } from '../spinner';

export const Carousel = () => {
  
  const dispatch = useDispatch();
  const data = useSelector(selectPosts);
  
  useEffect(() => {
    dispatch(getPosts())
  }, []);

  const renderSpinner = () => {
    return (
      <div className="spinner-container" style={{ minHeight: '200px' }}>
        <Spinner />
      </div>
    );
  };

  const handleRedirectToPost = (id: string) => {
    dispatch(changeRoute('/posts'));
    dispatch(setFocusItemId(id))
  };

  return (
    data.length > 0 ? <CarouselContent handleRedirectToPost={handleRedirectToPost} data={data} /> : renderSpinner()
  );
};
