import './style.css';
import { sliders } from '../sliders/sliders';

const stockSlider = () => {
  const sliderOne = <HTMLInputElement>document.getElementById('slider-3');
  const sliderTwo = <HTMLInputElement>document.getElementById('slider-4');
  const displayValOne = <HTMLElement>document.getElementById('range3');
  const displayValTwo = <HTMLElement>document.getElementById('range4');
  const minGap = 1;
  const sliderTrack = <HTMLElement>document.querySelector('.slider-track-2');
  const coeff = 1.5;

  sliders(sliderOne, sliderTwo, displayValOne, displayValTwo, minGap, sliderTrack, coeff);
};

export { stockSlider };
