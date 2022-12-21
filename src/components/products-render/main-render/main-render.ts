import './main-render.css'
interface IbasketRender {
  [ind: string]: number;
}

const basketRender: IbasketRender = {};
const totalItemInBasket = <HTMLElement>document.querySelector('.total-item');
interface Iproduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: null;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export const mainRender = (product: Iproduct) => {
  const render = document.querySelector('.render-area');

  const item = document.createElement('div');
  item.classList.add('product-item');

  item.dataset.id = '' + product.id;
  const itemButtonsWrapper = document.createElement('div');
  itemButtonsWrapper.classList.add('item-buttons-wrapper');

  const itemWrapperButtonBuy = document.createElement('button');
  itemWrapperButtonBuy.classList.add('item-wrapper-button-buy');
  itemWrapperButtonBuy.classList.add('button');
  itemWrapperButtonBuy.dataset.buy = '' + product.id;
  itemWrapperButtonBuy.textContent = 'add to cart';

  itemWrapperButtonBuy.addEventListener('click', () => {
    let idIndex = itemWrapperButtonBuy.dataset.buy;
    if (basketRender[idIndex!] !== 1) {
      basketRender[idIndex!] = 1;
      itemWrapperButtonBuy.textContent = 'remove';
    } else {
      basketRender[idIndex!]--;
      itemWrapperButtonBuy.textContent = 'add to cart';
    }
    totalItemInBasket.textContent = '' + getNonNullKeys(basketRender);
    localStorage.setItem('basket', JSON.stringify(basketRender));
  });

  const itemWrapperButtonInfo = document.createElement('button');
  itemWrapperButtonInfo.classList.add('item-wrapper-button-info');
  itemWrapperButtonInfo.classList.add('button');
  itemWrapperButtonInfo.dataset.info = '' + product.id;
  itemWrapperButtonInfo.textContent = 'info';

  itemButtonsWrapper.append(itemWrapperButtonBuy, itemWrapperButtonInfo);

  const itemWrapper = document.createElement('div');
  itemWrapper.classList.add('item-wrapper');
  itemWrapper.style.background = `url(${product.thumbnail}) 0% 0% / cover`;

  const title = document.createElement('h3');
  title.innerHTML = `${product.title}`;

  itemWrapper.append(itemButtonsWrapper);
  item.append(title);
  item.append(itemWrapper);
  render?.append(item);
};

function getNonNullKeys(obj: IbasketRender) {
  let quantity = 0;
  for (let item of Object.values(obj)) {
    if (item > 0) {
      quantity++;
    }
  }
  return quantity;
}
