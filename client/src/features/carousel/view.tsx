// @ts-ignore
import { useEffect, useState } from 'react';
import { ICarouselProps } from './carousel-interfaces';

export const CarouselContent = ({
  handleRedirectToPost,
  data,
}: ICarouselProps) => {

  useEffect(() => {

    const _num = (data.length / ITEMS_PER_ROW);
    const num = Number(_num.toFixed(0)) - 1;
    console.log({_num, num})
    maxSetStep(num)

  }, [data])

  const [margin, setMargin] = useState(0)

  const [step, setStep] = useState(0)
  const [maxStep, maxSetStep] = useState(0)

  const ITEMS_PER_ROW = 3;
  const CONTAINER_WIDTH_WITH_GAPS = 620

  const handleMoveCarousel = (direction: number) => {
    
    switch (direction) {
      case 0: // back
        if (step===direction) break;
        console.log('back')
        setStep(step-1)
        setMargin(margin + CONTAINER_WIDTH_WITH_GAPS)
        break;

      case 1: // forward
        if (step===maxStep) break;
        setStep(step+1)
        setMargin(margin - CONTAINER_WIDTH_WITH_GAPS)
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="carousel-wrapper">

      {console.log({step})}
      
      <div onClick={() => handleMoveCarousel(0)} className="carousel-item-cell-arrow carousel-item-cell-arrow--left">{'<'}</div>

      <div className="carousel-items-viewable">

        <div className="carousel-items-container" style={{ marginLeft: `${margin}px` }}>
          
          {data?.map((item, index) => {
            return (
              <div
                className={ ((index+1) % ITEMS_PER_ROW === 0) ?  "carousel-item-cell--box carousel-item-cell--box--no-gap" : "carousel-item-cell--box"}
                key={index}
                onClick={() => handleRedirectToPost(item.id)}
              >
                <div className="carousel-item-cell--box--content">
                  <div className="carousel-item-cell carousel-item-cell--title">
                    {item.title}
                  </div>
                  <div className="carousel-item-cell carousel-item-cell--description">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}

        </div>
      
      </div>
      
      <div onClick={() => handleMoveCarousel(1)} className="carousel-item-cell-arrow carousel-item-cell-arrow--right">{'>'}</div>
    
    </div>
  );
};
