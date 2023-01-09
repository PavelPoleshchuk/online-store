import './cart-item.css';
import { Idata, Iproduct, IstorageItem } from '../../../types/types';
import { productRender } from '../../product-render/productRender';
import { inCartCheck } from '../../../components/cart-checker/cartChecker';

const cartItemRender = (arr: IstorageItem[], limit: number, page: number) => {
  fetch(`https://dummyjson.com/products?limit=51`)
    .then((result) => result.json())
    .then((data: Idata) => {
      const productsItemWrapper = document.querySelector('.products-items');
      const productsArray = data.products as Iproduct[];
      const storageArray =
        (JSON.parse(localStorage.getItem('inCart') as string) as IstorageItem[]) || ([] as IstorageItem[]);
      const storageArrayLength = storageArray.length;

      for (let i = (page - 1) * limit; i < limit * page; i++) {
        if (typeof arr[i] !== 'undefined') {
          for (const elem of productsArray) {
            if (arr[i].id === elem.id) {
              const product = document.createElement('div');
              product.classList.add('cart-item');

              const productIndex = document.createElement('div');
              productIndex.classList.add('item-index');
              productIndex.innerHTML = `${i + 1}`;

              const productInfo = document.createElement('div');
              productInfo.classList.add('item-info');

              const productInfoImg = document.createElement('img');
              productInfoImg.src = elem.thumbnail;
              productInfoImg.alt = elem.title;

              const productInfoDetails = document.createElement('div');
              productInfoDetails.classList.add('product-details');

              const productTitle = document.createElement('h2');
              productTitle.innerHTML = elem.title;

              const productDescription = document.createElement('div');
              productDescription.classList.add('product-description');
              productDescription.innerHTML = elem.description;

              const productOther = document.createElement('div');
              productOther.classList.add('product-other');

              const productRating = document.createElement('div');
              productRating.classList.add('product-rating');
              productRating.innerHTML = `Rating: ${elem.rating}`;

              const prodcutDiscount = document.createElement('div');
              prodcutDiscount.classList.add('product-discoutn');
              prodcutDiscount.innerHTML = `Discount: ${elem.discountPercentage}`;

              productOther.append(productRating, prodcutDiscount);
              productInfoDetails.append(productTitle, productDescription, productOther);
              productInfo.append(productInfoImg, productInfoDetails);

              const productControl = document.createElement('div');
              productControl.classList.add('item-control');

              const stockControl = document.createElement('div');
              stockControl.classList.add('stock-control');
              stockControl.innerHTML = `Stock: ${elem.stock}`;

              const inDecContorol = document.createElement('div');
              inDecContorol.classList.add('inc-dec-control');
              inDecContorol.dataset.id = `${elem.id}`;

              const productsControlMinus = document.createElement('div');
              productsControlMinus.classList.add('button', 'button-minus');
              productsControlMinus.addEventListener('click', (e) => {
                const minusId = (e.target as HTMLElement).parentElement?.attributes[1].value;
                /*eslint-disable */
                for (let i = 0; i < storageArrayLength; i++) {
                  if (storageArray[i].id && storageArray[i].id == (minusId as unknown)) {
                    inCartCheck(storageArray[i], e);
                    productsControlSpan.innerHTML = `${parseInt(productsControlSpan.innerHTML) - 1}`;
                    (document.querySelector(
                      '.total-quantity span'
                    ) as HTMLElement).innerHTML = `${parseInt((document.querySelector('.total-quantity span') as HTMLElement).innerHTML) - 1}`;
                    (document.querySelector(
                      '.total-price span'
                    ) as HTMLElement).innerHTML =
                      (document.querySelector('.total-sum') as HTMLElement)?.innerHTML;
                  }
                }
                /*eslint-enable */
              });

              const productsControlPlus = document.createElement('div');
              productsControlPlus.classList.add('button', 'button-plus');
              productsControlPlus.addEventListener('click', (e) => {
                const plusId = (e.target as HTMLElement).parentElement?.attributes[1].value;
                /*eslint-disable */
                for (let i = 0; i < storageArrayLength; i++) {
                  if (
                    storageArray[i] &&
                    storageArray[i].id == (plusId as unknown) &&
                    parseInt(((e.target as HTMLElement).previousElementSibling as HTMLElement).innerHTML) < parseInt(stockControl.innerHTML.split(' ')[1])
                  ) {
                    inCartCheck(storageArray[i], e);
                    productsControlSpan.innerHTML = `${parseInt(productsControlSpan.innerHTML) + 1}`;
                    (document.querySelector('.total-quantity span') as HTMLElement).innerHTML = `${parseInt((document.querySelector(
                      '.total-quantity span'
                    ) as HTMLElement).innerHTML) + 1}`;
                    (document.querySelector('.total-price span') as HTMLElement).innerHTML = (document.querySelector(
                      '.total-sum'
                    ) as HTMLElement)?.innerHTML;
                  }
                }
                /*eslint-disable */
              });

              const productsControlSpan = document.createElement('span');
              inDecContorol.append(productsControlMinus, productsControlSpan, productsControlPlus);
              productsControlSpan.innerHTML = `${arr[i].counter}` || '1';

              const amountContorl = document.createElement('div');
              amountContorl.classList.add('amount-control');
              amountContorl.innerHTML = `€ ${elem.price}`;

              productControl.append(stockControl, inDecContorol, amountContorl);
              product.append(productIndex, productInfo, productControl);
              productsItemWrapper?.append(product);
            }
          }
        }
      }
      document.querySelectorAll('.item-info img').forEach((e) => {
        e.addEventListener('click', (e) => {
          const id = (e.target as HTMLImageElement).src.split('/')[5];
          window.history.pushState({ product: id }, '', `product_${id}`);
          productRender();
        });
      });
    })
    .catch((e) => console.log(e));
};

export { cartItemRender };
