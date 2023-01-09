import './cart-render.css';
import { noFoundRender } from '../main-render/no-found-render/noFoundRender';
import { cartItemRender } from './cartItem-render/cartItemRender';
import { IstorageItem } from '../../types/types';
import { modalRender } from '../modal-render/modalRender';

const cartRender = () => {
  (document.querySelector('.header-search') as HTMLElement).style.display = 'none';
  const renderArea = <HTMLElement>document.querySelector('.main');
  const storageArray =
    (JSON.parse(localStorage.getItem('inCart') as string) as IstorageItem[]) || ([] as IstorageItem[]);
  const storageArrayLength = storageArray.length;

  const cartWrapper = document.createElement('div');
  cartWrapper.classList.add('cart-wrapper');

  const products = document.createElement('div');
  products.classList.add('products-in-cart');

  const productsControl = document.createElement('div');
  productsControl.classList.add('cart-controls');

  const productsControlH2 = document.createElement('h2');
  productsControlH2.innerHTML = `Products in cart`;

  const productsControlParams = document.createElement('div');
  productsControlParams.classList.add('cart-controls__params');
  productsControl.append(productsControlH2, productsControlParams);

  const productsControlLimit = document.createElement('div');
  productsControlLimit.classList.add('cart-limit');
  productsControlLimit.innerHTML = `Limit: `;

  const productsControlLimitInput = document.createElement('input');
  productsControlLimitInput.type = 'number';
  productsControlLimitInput.min = '1';
  productsControlLimitInput.max = '6';
  productsControlLimitInput.value = '3';
  productsControlLimit.append(productsControlLimitInput);
  let limit = +productsControlLimitInput.value;

  const productsControlPages = document.createElement('div');
  productsControlPages.classList.add('cart-pages');
  productsControlPages.innerHTML = `Page: `;

  const productsControlPagesLeft = document.createElement('div');
  productsControlPagesLeft.classList.add('button', 'button-left');

  const productsControlPagesRight = document.createElement('div');
  productsControlPagesRight.classList.add('button', 'button-right');

  const productsControlPagesSpan = document.createElement('span');
  productsControlPages.append(productsControlPagesLeft, productsControlPagesSpan, productsControlPagesRight);
  productsControlPagesSpan.innerHTML = `1`;
  productsControlParams.append(productsControlLimit, productsControlPages);
  let page = +productsControlPagesSpan.innerHTML;

  const productsItems = document.createElement('div');
  productsItems.classList.add('products-items');
  products.append(productsControl, productsItems);

  if (storageArray && storageArray.length > 0) {
    cartItemRender(storageArray, limit, page);
  }

  const totalCart = document.createElement('div');
  totalCart.classList.add('total-cart');

  const totalCartH2 = document.createElement('h2');
  totalCartH2.innerHTML = `Summary`;

  const totalCartInfo = document.createElement('div');
  totalCartInfo.classList.add('total-cart__info');

  totalCart.append(totalCartH2, totalCartInfo);

  const totalQnt = document.createElement('div');
  totalQnt.classList.add('total-quantity');
  totalQnt.innerHTML = `Products: `;
  const qntSpan = document.createElement('span');
  const qnt = storageArray.reduce((acc: number, elem: IstorageItem) => acc + elem.counter, 0);
  qntSpan.innerHTML = `${qnt}` || `0`;
  totalQnt.append(qntSpan);

  const totalPrice = document.createElement('div');
  totalPrice.classList.add('total-price');
  totalPrice.innerHTML = 'Total: ';

  const priceSpan = document.createElement('span');
  const sum = storageArray.reduce((acc: number, elem: IstorageItem) => acc + elem.counter * elem.price, 0);
  priceSpan.innerHTML = `${sum}` || `0`;
  totalPrice.append(priceSpan);

  const buyButton = document.createElement('div');
  buyButton.classList.add('button', 'button-buy');
  buyButton.innerHTML = `Buy Now`;
  buyButton.addEventListener('click', function () {
    if (storageArrayLength > 0) {
      modalRender();
    } else {
      const emptyMessage = document.createElement('div');
      emptyMessage.classList.add('error-empty');
      emptyMessage.innerHTML = `Cart is Empty`;
      document.querySelector('.total-cart__info')?.append(emptyMessage);
      setTimeout(() => {
        emptyMessage.remove();
      }, 2000);
    }
  });

  totalCartInfo.append(totalQnt, totalPrice, buyButton);

  renderArea.innerHTML = '';
  cartWrapper.append(products, totalCart);
  renderArea.append(cartWrapper);

  if (!storageArray || storageArrayLength === 0) {
    noFoundRender(location.pathname);
  }

  //listeners
  productsControlPagesRight.addEventListener('click', () => {
    if (storageArrayLength / (+productsControlLimitInput.value * +productsControlPagesSpan.innerHTML) > 1) {
      productsControlPagesSpan.innerHTML = (parseInt(productsControlPagesSpan.innerHTML) + 1).toString();
      page = +productsControlPagesSpan.innerHTML;
      limit = +productsControlLimitInput.value;
      productsItems.innerHTML = '';
      cartItemRender(storageArray, limit, page);
    }
  });

  productsControlPagesLeft.addEventListener('click', () => {
    if (+productsControlPagesSpan.innerHTML > 1) {
      productsControlPagesSpan.innerHTML = (parseInt(productsControlPagesSpan.innerHTML) - 1).toString();
      page = +productsControlPagesSpan.innerHTML;
      limit = +productsControlLimitInput.value;
      productsItems.innerHTML = '';
      cartItemRender(storageArray, limit, page);
    }
  });

  productsControlLimitInput.addEventListener('input', () => {
    page = +productsControlPagesSpan.innerHTML;
    limit = +productsControlLimitInput.value;
    productsItems.innerHTML = '';
    cartItemRender(storageArray, limit, page);
  });
};
export { cartRender };
