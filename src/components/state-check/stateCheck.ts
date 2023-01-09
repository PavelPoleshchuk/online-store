import { globalFilter } from '../global-filter/globalFilter';
import { markLoadedValues } from '../mark-values/markLoadedValues';
import { HistoryState } from '../../types/types';

const stateCheck = () => {
  const categoryFilters = <HTMLElement>document.querySelector('.category-filter');
  const brandFilters = <HTMLElement>document.querySelector('.brand-filter');
  const priceFilters = <HTMLElement>document.querySelector('.price-filter');
  const stockFilters = <HTMLElement>document.querySelector('.stock-filter');
  const searchInput = <HTMLInputElement>document.getElementById('search');
  const sortSelector = <HTMLElement>document.querySelector('.sort-selector');
  const resetButton = <HTMLElement>document.querySelector('.reset');
  const copyLinkButton = <HTMLElement>document.querySelector('.copy-link');

  // фомируем query string
  function formQueryString(currentState: HistoryState): string {
    let queryString = '';
    Object.entries(currentState).forEach(([key, value]) => (queryString += `${key}=${value as string}*`));
    queryString = queryString.replace(/\*/gi, '&').slice(0, -1);
    return queryString;
  }

  // функция - главный обработчик состояния
  const mainStateCheck = (e: Event) => {
    console.clear();

    // получаем значения из отмеченных чекбосов
    const searchString = searchInput.value || '';
    let sortString = '';
    (sortSelector as HTMLSelectElement).selectedOptions[0].value === 'sort-title'
      ? (sortString = '')
      : (sortString = (sortSelector as HTMLSelectElement).selectedOptions[0].value);
    const brandsArray: string[] = [];
    const categoriesArray: string[] = [];
    const checkedBoxes = document.querySelectorAll('.checkbox:checked');
    let filterFlag: string | undefined = '';

    Array.from(checkedBoxes).forEach((elem) => {
      filterFlag = elem.parentElement?.classList.value.split('-')[0];
      filterFlag === 'brand'
        ? brandsArray.push((elem as HTMLInputElement).value)
        : categoriesArray.push((elem as HTMLInputElement).value);
    });

    // получаем значения из регуляторов диапазонов
    const minPrice = document.getElementById('range1');
    const maxPrice = document.getElementById('range2');
    const minStock = document.getElementById('range3');
    const maxStock = document.getElementById('range4');

    // флаг для определения фильтра (brand or category)
    const flag = (e.target as HTMLElement).parentElement?.classList.value.split('-')[0];

    let globalState = history.state as HistoryState;
    // формируем объект history.state
    if (!globalState) {
      globalState = {} as HistoryState;
    }
    if (searchString) {
      globalState.search = searchString;
    } else {
      delete globalState.search;
    }
    if (globalState.category !== categoriesArray && flag === 'category') {
      !categoriesArray.length ? delete globalState.category : (globalState.category = categoriesArray);
    }
    if (globalState.brand !== brandsArray && flag === 'brand') {
      !brandsArray.length ? delete globalState.brand : (globalState.brand = brandsArray);
    }
    if ((e.target as HTMLInputElement).id === 'slider-1' || (e.target as HTMLInputElement).id === 'slider-2') {
      globalState.price = [minPrice?.innerHTML as string, maxPrice?.innerHTML as string];
    }
    if ((e.target as HTMLInputElement).id === 'slider-3' || (e.target as HTMLInputElement).id === 'slider-4') {
      globalState.stock = [minStock?.innerHTML as string, maxStock?.innerHTML as string];
    }
    if (sortString && (e.target as HTMLSelectElement).id === 'sort-selector') {
      globalState.sort = [sortString];
    }
    history.pushState(globalState, '', `?${formQueryString(globalState)}`);
    globalFilter();
  };

  // начальная проверка параметров при перезагрузке страницы
  if (location.search.slice(1)) {
    const stateObjectInArray = location.search.slice(1).split('&');
    let globalFilterInit = {} as HistoryState;
    for (const key of stateObjectInArray) {
      const objectValue = key.split('=')[1].split(',');
      const newObject = { [key.split('=')[0]]: objectValue };
      globalFilterInit = { ...globalFilterInit, ...newObject };
    }
    history.pushState(globalFilterInit, '', `?${formQueryString(globalFilterInit)}`);
    markLoadedValues('initialLoad');
  }
  if (history.state === null) {
    const globalStateSourceArray = location.pathname.slice(1).split('_');
    if (globalStateSourceArray[0] !== '') {
      const globalState = { [globalStateSourceArray[0]]: globalStateSourceArray[1] };
      window.history.pushState(globalState, '', location.href);
    }
  }

  // ФУНКЦИИ ОБРАБОТЧИКИ
  [categoryFilters, brandFilters, searchInput].forEach((elem) => elem.addEventListener('input', mainStateCheck));
  [priceFilters, stockFilters].forEach((elem) => elem.addEventListener('change', mainStateCheck));
  [sortSelector].forEach((elem) => elem.addEventListener('change', mainStateCheck));
  resetButton.addEventListener('click', function () {
    history.pushState({}, '', '/');
    location.search = '';
    globalFilter();
  });
  copyLinkButton.addEventListener('click', function () {
    navigator.clipboard
      .writeText(location.href)
      .then(() => {
        copyLinkButton.innerHTML = `Copied`;
        setTimeout(() => {
          copyLinkButton.innerHTML = `Copy link`;
        }, 1000);
      })
      .catch((e) => console.log(e));
  });

  // проверка параметров при использовании кнопок истории браузера
  window.addEventListener('popstate', function () {
    this.location.href = location.href;
    markLoadedValues('popstate');
    globalFilter();
  });
  // TODO: npm run lint
};

export { stateCheck };
