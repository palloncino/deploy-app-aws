import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CarouselContent } from './view';
import { changeRoute } from '../routes';

const mock = [
  {
    description: 'desc123',
    html: '<h1>hello</h1>',
    id: '1d2215a3-c515-46b3-90fd-7e61d9e548ce',
    title: 'title1',
    image_url: 'https://picsum.photos/200',
  },
  {
    description: 'asd',
    html: 'asdasdasd',
    id: '020b1645-2789-418a-947f-e7b4bd191053',
    title: 'asd',
    image_url: 'asdasd',
  },
];

export const Carousel = () => {
  useEffect(() => {}, []);
  const dispatch = useDispatch();

  const handleRedirectToPost = () => {
    return dispatch(changeRoute('/posts'));
    // return dispatch(changeRouteAndCallback('/posts', () => console.log('callback!')));
  };

  return (
    <CarouselContent handleRedirectToPost={handleRedirectToPost} data={mock} />
  );
};
