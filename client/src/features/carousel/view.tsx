// @ts-ignore
import Carousel from 'react-simply-carousel';
import { useState } from 'react';

export const CarouselContent = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const mockedItems = [
    {
      title: 'test1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam ex sint consequatur voluptates iusto expedita quia accusantium! Cumque, recusandae amet nostrum nemo ipsam inventore at quod eum tempore! Temporibus?',
      date: '20 March 2021',
    },
    {
      title: 'test2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam ex sint consequatur voluptates iusto expedita quia accusantium! Cumque, recusandae amet nostrum nemo ipsam inventore at quod eum tempore! Temporibus?',
      date: '30 october 2021',
    },
    {
      title: 'test3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam ex sint consequatur voluptates iusto expedita quia accusantium! Cumque, recusandae amet nostrum nemo ipsam inventore at quod eum tempore! Temporibus?',
      date: '30 october 2021',
    },
    {
      title: 'test4',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam ex sint consequatur voluptates iusto expedita quia accusantium! Cumque, recusandae amet nostrum nemo ipsam inventore at quod eum tempore! Temporibus?',
      date: '30 october 2021',
    },
    {
      title: 'test5',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam ex sint consequatur voluptates iusto expedita quia accusantium! Cumque, recusandae amet nostrum nemo ipsam inventore at quod eum tempore! Temporibus?',
      date: '30 october 2021',
    },
    {
      title: 'test6',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quibusdam ex sint consequatur voluptates iusto expedita quia accusantium! Cumque, recusandae amet nostrum nemo ipsam inventore at quod eum tempore! Temporibus?',
      date: '30 october 2021',
    },
  ];

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
          cursor: 'pointer'
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
          cursor: 'pointer'
        },
      }}
      itemsToShow={3}
      speed={300}
    >
      {Array.from({ length: 10 }).map((item, index) => (
        <div
          style={{
            background: 'rgba(255,0,0,0.2)',
            width: 300,
            height: 300,
            border: '30px solid white',
            textAlign: 'center',
            lineHeight: '240px',
            boxSizing: 'border-box',
          }}
          key={index}
        >
          {index}
        </div>
      ))}
    </Carousel>
  );
};
