import { productsRender } from '../../pages/main-render/products-render/productsRender';
import { noFoundRender } from '../../pages/main-render/no-found-render/noFoundRender';
import { HistoryState, Idata, Iproduct } from '../../types/types';

const globalFilter = (): void => {
  const renderArea = <HTMLElement>document.querySelector('.render-area');
  const counterItems = <Element>document.querySelector('.header-found span');

  const filterParams = { ...history.state } as HistoryState;
  // console.log(filterParams);

  function checkboxHandler(arr: Iproduct[], filterName: string) {
    let params: string[] | undefined;
    const result: Iproduct[] = [];
    filterName === 'brand' ? (params = filterParams.brand) : (params = filterParams.category);

    arr.forEach((element: Iproduct) => {
      for (let i = 0; i < (params as string[]).length; i++) {
        if (Object.values(element).indexOf((params as string[])[i]) > -1) {
          result.push(element);
        }
      }
    });
    return result;
  }

  function rangeHandler(arr: Iproduct[], rangeName: string) {
    let params: string[] | undefined = [];
    const result: Iproduct[] = [];
    rangeName === 'price' ? (params = filterParams.price) : (params = filterParams.stock);

    for (const element of arr) {
      if (element[rangeName] >= params[0] && element[rangeName] <= params[1]) {
        result.push(element);
      }
    }
    return result;
  }

  function searchHandler(arr: Iproduct[]) {
    let params = '';
    (filterParams.search as string).length >= 3 ? (params = filterParams.search as string) : (params = '');
    const result = [];
    if (params) {
      for (let i = 0; i < arr.length; i++) {
        for (const elem in arr[i]) {
          if (typeof arr[i][elem] === 'string' && elem !== 'thumbnail') {
            // if (arr[i][elem].toLowerCase().startsWith(params)) {
            if ((arr[i][elem] as string).toLowerCase().includes(params.toLowerCase())) {
              result.push(arr[i]);
            }
          }
        }
      }
    }
    return [...new Set(result)];
  }

  function sortingHandler(arr: Iproduct[], sortDirection: string, sortMode: string) {
    let result: Iproduct[] = [];
    if (sortDirection === 'asc' && sortMode === 'price') {
      result = Object.values(arr).sort((a: Iproduct, b: Iproduct) => a.price - b.price);
    }
    if (sortDirection === 'desc' && sortMode === 'price') {
      result = Object.values(arr).sort((a: Iproduct, b: Iproduct) => b.price - a.price);
    }
    if (sortDirection === 'asc' && sortMode === 'rating') {
      result = Object.values(arr).sort((a: Iproduct, b: Iproduct) => a.rating - b.rating);
    }
    if (sortDirection === 'desc' && sortMode === 'rating') {
      result = Object.values(arr).sort((a: Iproduct, b: Iproduct) => b.rating - a.rating);
    }
    return result;
  }

  function addZero(value: number | string): string {
    if (value < 10) value = `0${value}`;
    return value.toString();
  }

  fetch('https://dummyjson.com/products?limit=51')
    .then((res) => res.json())
    .then((data: Idata) => {
      let resultArray = data.products as Iproduct[];

      if (Object.keys(filterParams).includes('search')) {
        resultArray = searchHandler(resultArray);
      }
      if (Object.keys(filterParams).includes('brand')) {
        resultArray = checkboxHandler(resultArray, 'brand');
      }
      if (Object.keys(filterParams).includes('category')) {
        resultArray = checkboxHandler(resultArray, 'category');
      }
      if (Object.keys(filterParams).includes('price')) {
        resultArray = rangeHandler(resultArray, 'price');
      }
      if (Object.keys(filterParams).includes('stock')) {
        resultArray = rangeHandler(resultArray, 'stock');
      }
      if (Object.keys(filterParams).includes('sort')) {
        const sortParams: string[] = filterParams.sort.join().split('-');
        resultArray = sortingHandler(resultArray, sortParams[1], sortParams[0]);
      }
      if (typeof resultArray !== 'undefined' && resultArray.length > 0) {
        if (renderArea.style.placeContent) renderArea.style.removeProperty('place-content');
        renderArea.innerHTML = '';
        for (let i = 0; i < resultArray.length; i++) {
          productsRender(resultArray[i]);
        }
      } else {
        noFoundRender(location.pathname);
      }
      // console.log('resultArray: ', resultArray);
      counterItems.innerHTML = addZero(resultArray.length);
    })
    .catch((e) => console.log(e));
};

export { globalFilter };
