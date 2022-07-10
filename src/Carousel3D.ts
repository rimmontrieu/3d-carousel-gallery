
import anime from 'animejs';
import CarouselItem from './CarouselItem';

/**
 * @author  raizensoft.com
 */
const ROTATE_SPEED = 0.25;

/**
 * Carousel3D
 * @class Carousel3D
 */
export default class Carousel3D {

  size:number;
  el:HTMLDivElement;
  imgEl:HTMLImageElement;
  canvasEl:HTMLCanvasElement;
  rid:number;
  xAngle:number;
  yAngle:number;
  scale:number;
  total:number;
  radius:number;
  citems:CarouselItem[];
  tiltAngle:number;

  constructor(size:number = 400, total:number = 15, radius:number = 1000) {

    // Item size and default total items
    this.size = size;
    this.total = total;
    this.radius = radius;
    this.tiltAngle = 0;
    this.init();
  }

  /**
   * Init class components
   * @method init
   */
  private init() {

    const el = this.el = document.querySelector('.carousel-3d');

    // Image and canvas element
    this.imgEl = document.createElement('img');
    this.imgEl.crossOrigin = 'anonymous';
    this.canvasEl = document.createElement('canvas');
    this.canvasEl.width = this.canvasEl.height = this.size;
    this.canvasEl.style.position = 'fixed';
    this.canvasEl.style.top = '50px';
    this.canvasEl.style.left = '50px';

    // Original angle and scale
    this.xAngle = this.yAngle = 0;
    this.scale = 1;

    // Generate carousel items
    this.citems = [];
    const angleSegment = 360 / this.total;
    for (let i = 0; i < this.total; i++) {

      const ci = new CarouselItem(this);
      ci.setPosition(angleSegment * i);
      this.el.appendChild(ci.el);
    }
    
    // Track mouse position
    document.body.addEventListener('pointermove', (e:PointerEvent) => {

      const height = document.body.offsetHeight;
      //console.log((e.clientY - height) / height);
      this.tiltAngle = (height - e.clientY) / height - 0.5;
      //console.log((height - e.clientY) / height - 0.5);
    });
  }
  
  loadImageSet(imgSet:any[]) {

    // Assign image to each cube face
    for (let i = 0; i < this.el.children.length; i++) {

      const item = this.el.children[i] as HTMLDivElement;
      item.style.backgroundImage = `url(${imgSet[i]})`;
      item.style.backgroundColor = 'transparent';
    }
  }

  /**
   * Start animation using requestAnimationFrame
   */
  startAnimate() {

    const doAnimate = () => {

      this.rid = requestAnimationFrame(doAnimate);
      this.yAngle += ROTATE_SPEED;
      this.xAngle += (-this.tiltAngle * 20 - this.xAngle) * 0.05;
      this.el.style.transform = `scale(${this.scale}) translateZ(-1200px) rotateX(${this.xAngle}deg) rotateY(${this.yAngle}deg)`;
    };
    doAnimate();
  }

  stopAnimate() {
    cancelAnimationFrame(this.rid);
  }
}
