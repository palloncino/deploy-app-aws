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
        style: {},
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
          className="carousel-item-cell--box"
          style={{
            width: 300,
            height: 300,
            border: '30px solid white',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          key={index}
        >
          <div
            onClick={() => handleRedirectToPost(item.id)}
            style={{
              height: '100%',
              width: '100%',
              backgroundSize: 'cover',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="carousel-item-cell carousel-item-cell--title">{item.title}</div>
            <div className="carousel-item-cell carousel-item-cell--description">{item.description}</div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
