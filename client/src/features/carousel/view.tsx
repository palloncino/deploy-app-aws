// @ts-ignore
import Carousel from 'react-simply-carousel';
import { useState } from 'react';
import { ICarouselProps } from './carousel-interfaces';

export const CarouselContent = ({ handleRedirectToPost, data }: ICarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Carousel
      updateOnItemClick
      containerProps={{
        style: {
          width: '100%',
          justifyContent: 'space-between',
        },
      }}
      activeSlideIndex={activeSlide}
      activeSlideProps={{
        style: {
          background: 'rgba(0,255,0,0.2)',
        },
      }}
      onRequestChange={setActiveSlide}
      forwardBtnProps={{
        children: '➡️',
        style: {
          width: 60,
          height: 60,
          minWidth: 60,
          alignSelf: 'center',
          border: 'none',
          background: 'transparent',
          fontSize: '2rem',
          cursor: 'pointer',
        },
      }}
      backwardBtnProps={{
        children: '⬅️',
        style: {
          width: 60,
          height: 60,
          minWidth: 60,
          alignSelf: 'center',
          border: 'none',
          background: 'transparent',
          fontSize: '2rem',
          cursor: 'pointer',
        },
      }}
      itemsToShow={3}
      speed={300}
    >
      {data?.map((item, index) => (
        <div
          style={{
            background: 'rgba(255,0,0,0.2)',
            width: 300,
            height: 300,
            border: '30px solid white',
            textAlign: 'center',
            // lineHeight: '240px',
            boxSizing: 'border-box',
          }}
          key={index}
        >
          <div
            onClick={() => handleRedirectToPost(item.id)}
            style={{
              background: `url(${item.image_url})`,
              height: '100%',
              backgroundSize: 'cover',
              cursor: 'pointer',
            }}
          >
            <div>{item.title}</div>
            <div>{item.description}</div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
