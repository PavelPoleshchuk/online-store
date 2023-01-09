import { priceSlider } from '../../pages/main-render/price-slider/priceSlider';
import { stockSlider } from '../../pages/main-render/stock-slider/stockSlider';
import { HistoryState } from '../../types/types';

const markLoadedValues = (eventParam: string) => {
  const globalState = history.state as HistoryState;
  console.log('state in markLoadedValues: ', globalState);
  const sortOption = <HTMLInputElement>document.getElementById('sort-selector');
  const minPrice = <HTMLInputElement>document.getElementById('slider-1');
  const maxPrice = <HTMLInputElement>document.getElementById('slider-2');
  const minStock = <HTMLInputElement>document.getElementById('slider-3');
  const maxStock = <HTMLInputElement>document.getElementById('slider-4');
  const searchInput = <HTMLInputElement>document.getElementById('search');

  if (globalState && !Object.keys(globalState).includes('product')) {
    if (eventParam === 'popstate') {
      const allCheckBoxes = <HTMLCollection>document.getElementsByTagName('input');
      Array.from(allCheckBoxes).forEach((element) => {
        if ((element as HTMLInputElement).type === 'checkbox') {
          (element as HTMLInputElement).checked = false;
        }
      });
      if (!globalState || !globalState.sort) {
        sortOption.value = 'sort-title';
      }
      if (!globalState || !globalState.price) {
        minPrice.value = '10';
        maxPrice.value = '1749';
        priceSlider();
      }
      if (!globalState || !globalState.stock) {
        minStock.value = '2';
        maxStock.value = '150';
        stockSlider();
      }
      globalState && globalState.search ? (searchInput.value = globalState.search) : (searchInput.value = '');
    }
    if (globalState && globalState.category) {
      for (let i = 0; i < globalState.category.length; i++) {
        const categoriesArray = <HTMLInputElement>document.getElementById(`${globalState.category[i]}`);
        categoriesArray.checked = true;
      }
    }
    if (globalState && globalState.brand) {
      for (let i = 0; i < globalState.brand.length; i++) {
        const brandsArray = <HTMLInputElement>document.getElementById(`${globalState.brand[i]}`);
        brandsArray.checked = true;
      }
    }
    if (globalState && globalState.sort) {
      sortOption.value = globalState.sort.join();
    }
    if (globalState && globalState.price) {
      minPrice.value = globalState.price[0];
      maxPrice.value = globalState.price[1];
      priceSlider();
    }
    if (globalState && globalState.stock) {
      minStock.value = globalState.stock[0];
      maxStock.value = globalState.stock[1];
      stockSlider();
    }
  }
};

export { markLoadedValues };
