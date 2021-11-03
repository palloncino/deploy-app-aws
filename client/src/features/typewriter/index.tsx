// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';

interface ITypewriterProps {
  element_id: string;
  strings: Array<string>;
  auto_start?: boolean,
  pause_for?: number;
  delete_speed?: number;
  delay?: number;
  loop?: boolean;
}

export function TypewriterComponent({ element_id, strings, auto_start = true, delete_speed = 10, delay = 20, loop = false, pause_for = 5000 }: ITypewriterProps) {
  setTimeout(() => {
    var div = document.getElementById(`${element_id}`);
    if (div) {
      // @ts-ignore
      new Typewriter(div, {
        strings: strings,
        autoStart: auto_start,
        deleteSpeed: delete_speed,
        pauseFor: pause_for,
        loop: loop,
        delay: delay,
      });
    }

  }, 0);

  return <div id={element_id}></div>;
}