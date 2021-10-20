import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CarouselContent } from './view';
import { changeRoute } from '../routes';
import { getPosts } from '../pages/posts/postsSLice'
import { useSelector } from 'react-redux';
import { selectPosts } from '../pages/posts/postsSLice';

export const Carousel = () => {
  
  const dispatch = useDispatch();
  const data = useSelector(selectPosts);
  
  useEffect(() => {
    dispatch(getPosts())
  }, []);

  const handleRedirectToPost = () => {
    return dispatch(changeRoute('/posts'));
  };

  return (
    data.length > 0 ? <CarouselContent handleRedirectToPost={handleRedirectToPost} data={data} /> : <div>Loading</div>
  );
};
