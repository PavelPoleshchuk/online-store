import './products-render.css';
import { Iproduct } from '../../../types/types';
import { productRender } from '../../product-render/productRender';
import { inCartCheck } from '../../../components/cart-checker/cartChecker';

const renderArea = document.querySelector('.render-area');

const productsRender = (product: Iproduct) => {
  const item = document.createElement('div');
  item.classList.add('product-item');

  item.dataset.id = `${product.id}`;
  const itemButtonsWrapper = document.createElement('div');
  itemButtonsWrapper.classList.add('item-buttons-wrapper');

  const itemWrapperButtonBuy = document.createElement('button');
  itemWrapperButtonBuy.classList.add('item-wrapper-button-buy', 'button');
  itemWrapperButtonBuy.dataset.buy = `${product.id}`;

  if (inCartCheck({ id: product.id, price: product.price })) {
    itemWrapperButtonBuy.textContent = 'drop from cart';
    itemWrapperButtonBuy.classList.add('added');
  } else {
    itemWrapperButtonBuy.textContent = 'add to cart';
    itemWrapperButtonBuy.classList.remove('added');
  }
  itemWrapperButtonBuy.addEventListener('click', function (e) {
    inCartCheck({ id: product.id, price: product.price, counter: 1 }, e);
  });

  const itemWrapperButtonInfo = document.createElement('button');
  itemWrapperButtonInfo.classList.add('item-wrapper-button-info', 'button');
  itemWrapperButtonInfo.dataset.info = `${product.id}`;
  itemWrapperButtonInfo.textContent = 'details';

  itemButtonsWrapper.append(itemWrapperButtonBuy, itemWrapperButtonInfo);

  const itemWrapper = document.createElement('div');
  itemWrapper.classList.add('item-wrapper');
  itemWrapper.style.background = `url(${product.thumbnail}) 0% 0% / cover`;

  const title = document.createElement('h3');
  title.innerHTML = `${product.title}`;

  const itemInfoBlock = document.createElement('div');
  itemInfoBlock.classList.add('item-info-block');
  getItemInfoBlock(product, itemInfoBlock);

  itemWrapper.append(itemButtonsWrapper);
  itemWrapper.append(itemInfoBlock);
  item.append(title);
  item.append(itemWrapper);
  renderArea?.append(item);

  itemWrapperButtonInfo.addEventListener('click', function (e) {
    const id: string = (e.target as HTMLElement).attributes[1].value;
    window.history.pushState({ product: id }, '', `product_${id}`);
    productRender();
  });
};

const getItemInfoBlock = (product: Iproduct, div: HTMLDivElement) => {
  [
    ['category', 'Category'],
    ['brand', 'Brand'],
    ['price', 'price'],
    ['discountPercentage', 'Discount'],
    ['rating', 'Rating'],
    ['stock', 'Stock'],
  ].forEach((elem) => {
    const pItemInfo = document.createElement('p');
    pItemInfo.classList.add('p-item-info');
    pItemInfo.textContent = `${product[elem[0] as keyof Iproduct]}`;
    const spanItemInfo = document.createElement('span');
    spanItemInfo.classList.add('span-item-info');
    spanItemInfo.textContent = elem[1] + ': ';
    pItemInfo.prepend(spanItemInfo);
    div.append(pItemInfo);
  });
};

export { productsRender };
