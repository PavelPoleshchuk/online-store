import './style.css';
import { sliders } from '../sliders/sliders';

const priceSlider = () => {
  const sliderOne = <HTMLInputElement>document.getElementById('slider-1');
  const sliderTwo = <HTMLInputElement>document.getElementById('slider-2');
  const displayValOne = <HTMLElement>document.getElementById('range1');
  const displayValTwo = <HTMLElement>document.getElementById('range2');
  const minGap = 20;
  const sliderTrack = <HTMLElement>document.querySelector('.slider-track');
  const coeff = 17.4;

  sliders(sliderOne, sliderTwo, displayValOne, displayValTwo, minGap, sliderTrack, coeff);
};

export { priceSlider };
