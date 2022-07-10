
/**
 * @author  raizensoft.com
 */

import Carousel3D from "./Carousel3D";

/**
 * CarouselItem
 * @class CarouselItem
 */
export default class CarouselItem {

  c3d:Carousel3D;
  el:HTMLDivElement;
  angle:number;

  constructor(c3d:Carousel3D) {

    this.c3d = c3d;
    this.angle = 0;
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  private init() {

    const el = this.el = document.createElement('div');
    el.className = 'carousel-item';
  }

  /**
   * Set carousel position based on angle
   */
  setPosition(angle:number) {

    this.angle = angle;
    const xpos = Math.cos(angle * Math.PI / 180) * this.c3d.radius;
    const zpos = Math.sin(angle * Math.PI / 180) * this.c3d.radius;
    this.el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${90 - angle}deg) `;
  }
  
  setBackground(url:string) {
    this.el.style.background = `url${url}`;
  }
}
