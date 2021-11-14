import { TimelineMax, Elastic, Back, Linear } from "gsap/all";
import { useEffect } from "react";

export const Icon = (animate) => {

  useEffect(()=>{

    // if (!!animate) {
    //   setTimeout(()=>{
    
    //     (function() {
    //       var tl = new TimelineMax();
    //       var bgd = document.querySelector('#background #rect');
    //       var table = document.querySelector('#table_legs, #table');
    //       var lampLeg = document.querySelector('#lamp > .lamp-leg');
    //       var lampbt = document.querySelector('#lamp-bottom');
    //       var lampLight = document.querySelector('#lamp > .light');
    //       var lampLine = document.querySelector('#lamp-line');
    //       var lampLineB = document.querySelector('#lamp-line-b');
    //       var lampLineT = document.querySelector('#lamp-line-t');
    //       var lampCircle = document.querySelector('#lamp-circle');
    //       var lampHead = document.querySelector('#lamp-head');
    //       var lampHeader = document.querySelector('#lamp-header');
    //       var lampBody = document.querySelector('#lamp-body');
    //       var computer = document.querySelector('#computer > *');
    //       var keyboard = document.querySelector('#keyboard > *');
    //       var asset = document.querySelector('#computer_mouse > * , #coffee_mug > *');

          
    //       tl.from(bgd, 0.2, {opacity:0, scale:0, transformOrigin: 'center center'})
    //         .staggerFrom(table, 0.2, {y:"-=200", opacity: 0, ease: Elastic.easeOut}, 0.1)
    //         .from(lampLeg, 0.2, {opacity:0, x: "-200", ease: Elastic.easeOut})
    //         .from(lampbt, 0.2, {opacity:0, scale:0, transformOrigin: 'center center'})
    //         .from(lampLineB, 0.3,{opacity:0, transformOrigin: '100% 100%', rotation: '-180deg'})
    //         .from(lampCircle,0.1,{opacity:0, x: '-=100', y: '-=100'})
    //         .from(lampLineT, 0.3,{opacity:0, transformOrigin: '0% 100%', rotation: '-180deg'})
    //         .from(lampHead, 0.2, {opacity:0, scale:0, ease: Elastic.easeOut})
    //         .from(lampHeader, 0.5, {transformOrigin: '60% 60%', rotation: '60deg'})
    //         .from(lampBody, 0.5, {transformOrigin: '70% 70%', rotation: '-25deg'})
    //         .staggerFrom(computer, 1, {opacity: 0, scale: 0, transformOrigin: 'center center', ease: Back .easeOut}, 0.2)
    //         .staggerFrom(keyboard, 0.5, {opacity: 0, y: '-=100', ease: Linear.easeInOut }, 0.05)
    //         .staggerFrom(asset, 0.5, {opacity: 0}, 0.05)
    //         .to(lampLight, 0.2, {opacity:0.8, ease: Elastic.easeOut, delay:0.5}, "a")
    //         .to(lampLight, 0.1, {opacity:0}, "b")
    //         .to(lampLight, 0.1, {opacity:0.2}, "c")
    //         .to(bgd, 0.2, {opacity: 0.1, delay:0.5}, "a-=0.05")
    //         .to(bgd, 0.1, {opacity: 1}, "b-=0.05")
    //         .to(bgd, 0.1, {opacity: 0.5}, "c-=0.05")
    //         .to(bgd, 0.2, {opacity: 1, fill: '#fff'})
    //         .fromTo(lampLine, 0.2, {opacity: 0},{opacity: 0.2, delay:0.5}, "a-=0.05")
    //         .to(lampLine, 0.1, {opacity: 1}, "b-=0.05")
    //         .to(lampLine, 0.1, {opacity: 0.5}, "c-=0.05");
    //     })()
    
    //   }, 0)
    // }

    
  }, [])


  return (

    
    <svg
      style={{ width: '100%', maxHeight: `calc(100vh - 80px)`, margin: '0 auto' }}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      id="svg"
      x="0"
      y="0"
      enableBackground="new 0 0 1186.4 662.8"
      version="1.1"
      viewBox="0 0 1186.4 662.8"
      xmlSpace="preserve"
    >
      <path
        id="background"
        // fill="#2c3e50"
        fill="transparent"
        d="M-9.7 0H1187.3999999999999V662.8H-9.7z"
      ></path>
      <g id="table_legs">
        <defs>
          <path id="SVGID_1_" d="M-9.7 0H1187.3999999999999V662.8H-9.7z"></path>
        </defs>
        <clipPath id="SVGID_2_">
          <use overflow="visible" xlinkHref="#SVGID_1_"></use>
        </clipPath>
        <path
          fill="#EDCF94"
          stroke="#0B0B0B"
          strokeMiterlimit="10"
          d="M47.2 626.1H81.2V682.5H47.2z"
          clipPath="url(#SVGID_2_)"
        ></path>
        <path
          fill="#EDCF94"
          stroke="#0B0B0B"
          strokeMiterlimit="10"
          d="M850.5 626.6H1131.9V676.5H850.5z"
          clipPath="url(#SVGID_2_)"
        ></path>
      </g>
      <g id="table">
        <path
          fill="#EDCF94"
          stroke="#0B0B0B"
          strokeMiterlimit="10"
          d="M1172 626.1H18.4c-2.7 0-5-1.1-5-2.5v-14.3c0-1.4 2.2-2.5 5-2.5H1172c2.7 0 5 1.1 5 2.5v14.3c0 1.4-2.2 2.5-5 2.5z"
        ></path>
        <path fill="#D7B476" d="M851 627.2H1131.4V637.7H851z"></path>
        <path
          fill="#D7B476"
          d="M47.7 626.7H80.7V633.3000000000001H47.7z"
        ></path>
      </g>
      <g id="computer">
        <path
          fill="#888889"
          stroke="#050606"
          strokeMiterlimit="10"
          d="M548.7 548.3L544.4 575.1 643.1 575.1 637.8 548.3z"
        ></path>
        <path
          fill="#767677"
          d="M548.4 555.7L547.6 561.7 639.5 561.7 638.4 554.7 548.9 554.7"
        ></path>
        <path
          fill="#E5E9ED"
          stroke="#050606"
          strokeMiterlimit="10"
          d="M768.1 556.4H419.5c-6.8 0-12.3-5.3-12.3-11.8V285.1c0-6.5 5.5-11.8 12.3-11.8H768c6.8 0 12.3 5.3 12.3 11.8v259.4c.1 6.6-5.4 11.9-12.2 11.9z"
        ></path>
        <path
          fill="#202021"
          stroke="#050606"
          strokeMiterlimit="10"
          d="M770.8 510.3H413c-3.2 0-5.8-2.6-5.8-5.8V284.2c0-6.1 4.9-11 11-11h350.6c6.4 0 11.7 5.2 11.7 11.7v215.8c-.1 5.3-4.4 9.6-9.7 9.6z"
        ></path>
        <path
          fill="#434445"
          stroke="#070808"
          strokeMiterlimit="10"
          d="M423.3 286.1H764.3V497.40000000000003H423.3z"
        ></path>
        <path
          fill="#C7C6C6"
          stroke="#070808"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M518.9 596.3l1 5.6c.2 1.3 1.3 2.2 2.6 2.2h138.2c2.9 0 5.4-2.1 5.9-4.9v-.1c.2-1-.6-1.8-1.5-1.8l-146.2-1z"
        ></path>
        <path
          fill="#A3A3A2"
          stroke="#070808"
          strokeMiterlimit="10"
          d="M544.1 575.1l-25.4 20.3c-1.3 1.1-.6 3.3 1.2 3.3l145.5-.4c1.1 0 1.6-1.3.8-2l-23.8-21.2h-98.3z"
        ></path>
        <path
          fill="#A3A3A2"
          d="M545.5 574l-.6 1.3c-1 1-1.4 1.3-2 1.9l-4.7 3.7 109.2.4-3-3.1c-.4-.4-.9-.8-1.2-1.2-.7-.8-.7-.6-1.1-1.7V574h-96.6zM521.8 601.8c.3.6 1.2 1.8 2 1.8h135.7c.5 0 1.1-.1 1.6-.2.5-.2 1.2-1.2 1.8-1.6H521.8z"
        ></path>
        <circle cx="593.8" cy="280.6" r="1.3" fill="#5FBB46"></circle>
        <path
          fill="#2D2D2D"
          d="M589.7 275.5L423.6 278s-9.7.9-10.9 10.3c-1.2 9.4-1.9 118.4-3.4 138.9s0-138.9 0-138.9-1.9-13.4 14.2-13.1l166.2.3zM597.2 275.5l166.1 2.5s9.7.9 10.9 10.3c1.2 9.4 1.9 118.4 3.4 138.9s0-138.9 0-138.9 1.9-13.4-14.2-13.1l-166.2.3z"
        ></path>
        <path
          fill="#CED1D3"
          d="M763.9 555.4H422.6c-10.5 1-14.1-5.4-14.2-8.6 1.4.4 2.9.6 4.4.6l358.8 1.6c2.5 0 4.9-.4 7.2-1.3-1.1 3.4-3.6 8.7-14.9 7.7z"
        ></path>
        <path
          fill="#434445"
          fillRule="evenodd"
          d="M593.3 525.8c.6 0 1.4.1 2.2.4.9.3 1.5.4 1.7.4.4 0 1-.1 1.8-.4.8-.3 1.6-.4 2.2-.4 1 0 1.9.3 2.7.8.4.3.9.7 1.3 1.3-.7.6-1.1 1.1-1.4 1.5-.5.8-.8 1.7-.8 2.6 0 1 .3 2 .9 2.8.6.8 1.2 1.4 2 1.6-.3 1-.8 2.1-1.5 3.2-1.1 1.6-2.2 2.5-3.2 2.5-.4 0-1-.1-1.8-.4-.7-.3-1.4-.4-1.9-.4s-1.1.1-1.8.4c-.7.3-1.2.4-1.7.4-1.3 0-2.5-1.1-3.8-3.3-1.2-2.2-1.9-4.3-1.9-6.3 0-1.9.5-3.5 1.4-4.7.9-1.4 2.1-2 3.6-2z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#434445"
          fillRule="evenodd"
          d="M601 521c0 .1.1.2.1.3v.2c0 .5-.1 1.1-.4 1.7-.2.6-.6 1.2-1.2 1.7-.5.5-.9.8-1.4.9-.3.1-.7.2-1.3.2 0-1.2.3-2.3 1-3.2.7-.9 1.8-1.5 3.2-1.8z"
          clipRule="evenodd"
        ></path>
      </g>
      <g id="keyboard">
        <path
          fill="#E5E9ED"
          stroke="#0D0D0D"
          strokeMiterlimit="10"
          d="M692.9 606.8H363.5V602c0-4 3.2-7.2 7.2-7.2h315c4 0 7.3 3.3 7.3 7.3v4.7z"
        ></path>
        <path
          fill="#D2D6D8"
          d="M692 605.9L364.3 605.9 364.4 602.6 692.1 602.6z"
        ></path>
        <path d="M376.7 593H398.09999999999997V594.9H376.7z"></path>
        <path d="M469.8 593H491.2V594.9H469.8z"></path>
        <path d="M492.8 592.9H588.2V594.8H492.8z"></path>
        <path d="M399.6 593H421V594.9H399.6z"></path>
        <path d="M422.8 593H444.2V594.9H422.8z"></path>
        <path d="M445.9 593H467.29999999999995V594.9H445.9z"></path>
        <path d="M590.3 592.9H611.6999999999999V594.8H590.3z"></path>
        <path d="M613.2 592.9H634.6V594.8H613.2z"></path>
        <path d="M636.3 592.9H657.6999999999999V594.8H636.3z"></path>
        <path d="M659.5 592.9H680.9V594.8H659.5z"></path>
        <path
          fill="#FFF"
          stroke="#0D0D0D"
          strokeMiterlimit="10"
          d="M397.1 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM419.9 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM443.1 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM466.3 593.9H447v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM610.7 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM633.5 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM656.7 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM679.9 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM490.1 593.9h-19.3v-2.1c0-.6 1-1.2 2.3-1.2h14.6c1.3 0 2.4.5 2.4 1.2v2.1zM587.1 594h-93.6v-2.1c0-.7 5-1.2 11.2-1.2h70.9c6.3 0 11.5.5 11.5 1.2v2.1z"
        ></path>
      </g>
      <g id="lamp">
        <g id="lamp-body" stroke="#0B0B0B" strokeMiterlimit="10">
          <g id="lamp-header">
            <g id="lamp-line-t" fill="#228370">
              <path d="M187.9 333.9L194.8 337.7 70.9 417.1 65.2 411.6 187.9 333.9"></path>
              <path d="M198.6 342.1L205.5 346.9 84.1 425.2 79 419.7 198.6 342.1"></path>
            </g>
            <g id="lamp-head">
              <ellipse
                cx="193.8"
                cy="347.5"
                fill="#228370"
                rx="18.5"
                ry="19.3"
              ></ellipse>
              <path
                fill="#E8DF9A"
                d="M225.9 393.2s13 10.9 26.6 2.5c2.4-1.5 4.4-3.9 5.7-6.6 3.3-6.8 7.6-20.6-5-31.8l-27.3 35.9z"
              ></path>
              <path
                fill="#3FBDA4"
                d="M270.5 319.1c-20.6-7.9-47.5-7.3-64.6 4.4-11.4 7.8-20 19-24.3 33.7-8.6 29.1 1.8 61 22.5 79.4 1.3 1.2 3.3 1 4.3-.5L285.7 330c.7-.9.5-2.3-.4-2.9-4.5-3.3-9.4-6-14.8-8z"
              ></path>
            </g>
          </g>
          <g id="lamp-line-b" fill="#228370">
            <path d="M69.7 432.6L74.6 426.3 125.8 567.8 119.5 572.6 69.7 432.6"></path>
            <path d="M81.6 429.1L87.5 422.9 138.2 561.8 132 566 81.6 429.1"></path>
          </g>
          <ellipse
            id="lamp-circle"
            cx="80.2"
            cy="422.9"
            fill="#3FBDA4"
            rx="19.7"
            ry="20.5"
          ></ellipse>
        </g>
        <path
          fill="#228370"
          stroke="#0B0B0B"
          strokeMiterlimit="10"
          d="M193.8 606.2H66.2v-11.6c0-1.6 2.1-2.9 4.7-2.9h121.2c1 0 1.7.5 1.7 1.1v13.4z"
          className="lamp-leg"
        ></path>
        <g id="lamp-bottom" stroke="#0B0B0B" strokeMiterlimit="10">
          <path
            fill="#3FBDA4"
            d="M81.6 591.6s10.6-32.8 48.4-31.4c0 0 39 2.3 48.7 31.4H81.6z"
          ></path>
          <path
            fill="#70BAAF"
            d="M147.9 564s8.8 4.6 17-.4c.5-.3 1 .1 1 .8v9.2s-13.8-8.3-18-9.6z"
          ></path>
        </g>
        <path
          fill="#FCF1C4"
          d="M276.4 343L781.8 605.3 312.8 606.8 223 418.9"
          className="light"
          opacity="0"
        ></path>
        <g id="lamp-line">
          <path
            fill="#2FAF97"
            d="M182.3 357.8c-8.4 28.4 1.9 61.2 23.2 78.5 1.2-.5-1.2.5 0 0l-3.4-108.7c-9.2 7.5-16.1 17.6-19.8 30.2zM61.3 422.9c0 10.7 8.4 19.6 18.2 19.6h.6L74 404.3c-7.2 2.5-12.7 9.9-12.7 18.6zM83 590.7h39l-8.3-27.8C90.4 569.8 83 590.7 83 590.7z"
          ></path>
          <path
            fill="none"
            stroke="#BFE4E2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M220.9 321.6c-.4-.1 26.1-7 46 3.5"
          ></path>
          <path
            fill="none"
            stroke="#BFE4E2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M271.7 328.3L274.8 330"
          ></path>
          <path
            fill="none"
            stroke="#BFE4E2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M88.5 409.4s9.3 7.1 6.2 16.8M125.8 564.4s17 1 28.6 9.2"
          ></path>
          <path
            fill="none"
            stroke="#BFE4E2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M160.2 577.1L163.3 579.5"
          ></path>
        </g>
      </g>
      <g id="computer_mouse">
        <path
          fill="#E5E9ED"
          stroke="#0B0B0B"
          strokeMiterlimit="10"
          d="M724.1 606.7s0-8.6 12.9-14.3c8.7-3.9 18.7-4 27.5-.6 6.8 2.6 13.7 7.2 13.7 15l-54.1-.1z"
        ></path>
        <path
          fill="#D1D4D6"
          d="M764.5 592.5c-3.9-1.4-9-2.6-13.3-2.4v15.7l26.1.1c-.1-4.3-4.3-10.3-12.8-13.4z"
        ></path>
      </g>
      <g id="coffee_mug">
        <path
          fill="#F9EFE5"
          stroke="#0D0D0D"
          strokeMiterlimit="10"
          d="M849.8 516.5L865.1 606.8 908 606.8 922.4 516.5 853.7 516.5"
        ></path>
        <path
          fill="#F3E5D4"
          d="M921.2 519.5L886.1 516.5 885.7 605.9 907.4 605.9z"
        ></path>
        <path
          fill="#BE5532"
          stroke="#0D0D0D"
          strokeMiterlimit="10"
          d="M853.3 546.7L859.7 581.7 912.8 581.7 918.9 546.7z"
        ></path>
        <path
          fill="#AD4025"
          d="M917.8 547.7L886.2 547.7 886.1 580.9 912.2 580.9z"
        ></path>
        <path
          fill="none"
          stroke="#9B3021"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M858.3 551.2L914.7 551.2"
        ></path>
        <path
          fill="none"
          stroke="#9B3021"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M860.1 557.9L913.7 557.9"
        ></path>
        <path
          fill="none"
          stroke="#9B3021"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M861.1 565.8L911.6 565.8"
        ></path>
        <path
          fill="none"
          stroke="#9B3021"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M862.1 573.1L910.5 573.1"
        ></path>
        <path
          fill="none"
          stroke="#9B3021"
          strokeLinecap="round"
          strokeMiterlimit="10"
          d="M862 578.7L909.5 578.7"
        ></path>
        <path
          fill="#BE5532"
          stroke="#0B0B0B"
          strokeMiterlimit="10"
          d="M845.3 524.5L926.2 524.5 926.2 516.5 849.8 516.5 845.3 516.5z"
        ></path>
        <path
          fill="#BE5532"
          stroke="#070808"
          strokeMiterlimit="10"
          d="M851.8 505.9L849.8 516.5 921.2 516.5 918.9 505.9z"
        ></path>
        <path
          fill="#AD4025"
          d="M925.2 517.5L920 517.5 886.7 517.5 886.7 523.6 925.2 523.8z"
        ></path>
        <path
          fill="#AD4025"
          d="M920 515.7L918.2 506.7 886.8 506.8 886.8 515.7z"
        ></path>
        <path
          fill="#9B3021"
          d="M850.9 515.7L851.2 513.7 919.6 513.7 920 515.7z"
        ></path>
      </g>
    </svg>
  );
}
