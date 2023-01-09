const sliders = (
  sliderOne: HTMLInputElement,
  sliderTwo: HTMLInputElement,
  displayValOne: HTMLElement,
  displayValTwo: HTMLElement,
  minGap: number,
  sliderTrack: HTMLElement,
  coeff: number
) => {
  function converter(value: string) {
    return Math.trunc(parseInt(value) / coeff).toString();
  }

  function slideOne() {
    const id = '1';
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = (parseInt(sliderTwo.value) - minGap).toString();
    }
    displayValOne.textContent = sliderOne.value;
    fillColor(id, converter(sliderOne.value));
  }

  function slideTwo() {
    const id = '2';
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = (parseInt(sliderOne.value) + minGap).toString();
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor(id, converter(sliderTwo.value));
  }

  function fillColor(id: string, percent: string) {
    let percent1: string = converter(sliderOne.value);
    let percent2: string = converter(sliderTwo.value);

    id === '1' ? (percent1 = percent) : (percent2 = percent);

    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #BA3B0A ${percent1}%, #BA3B0A ${percent2}%, #dadae5 ${percent2}%)`;
  }

  slideOne();
  slideTwo();
  sliderOne.addEventListener('input', slideOne);
  sliderTwo.addEventListener('input', slideTwo);
};

export { sliders };
