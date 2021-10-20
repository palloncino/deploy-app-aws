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

  console.log(1.1, {data})
  
  useEffect(() => {
    dispatch(getPosts())
  }, []);

  console.log(1.2, {data})

  const renderSpinner = () => {
    return (
      <div className="spinner-container">
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
