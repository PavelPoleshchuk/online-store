import './basket.css';
import {
  basketRender,
  getNonNullKeys,
  refreshTotalItemInBasket,
  setLocalStorage,
} from '../products-render/productsRender';
import { Iproduct, Idata } from '../../types/types';

export function refreshTotalSumHeader(dataFromFetch: Iproduct[]): void {
  const totalSum = document.querySelector('.total-sum');
  const totalPriceSummary = document.querySelector('.total-price-summary');
  const sumTotalHeder = Object.entries(basketRender).reduce(
    (acc, item) => acc + dataFromFetch[parseInt(item[0]) - 1]['price'] * item[1],
    0
  );
  console.log(sumTotalHeder);
  totalSum ? (totalSum.textContent = '€ ' + sumTotalHeder.toString()) : 'error';
  totalPriceSummary ? (totalPriceSummary.textContent = '€ ' + sumTotalHeder.toString()) : 'error';
}

// формирование HTML корзины и получение инфо о товаре
export const getBasketBlock = () => {
  fetch('https://dummyjson.com/products?limit=51')
    .then((res) => res.json())
    .then((dataFetch: Idata) => {
      const data = dataFetch.products as Iproduct[];
      refreshTotalSumHeader(data);

      //при нажатии на рисунок корзины в хедере скрывается основной раздел и добавляется корзина(basketDiv.remove('display-none'))
      //отрисовывается содержимое текущей страницы корзины
      const basketBlock = () => {
        const buttonBasket = <HTMLElement>document.querySelector('.header-cart__img');
        const mainBlock = <HTMLElement>document.querySelector('.content-wrapper');
        const basketDiv = <HTMLElement>document.querySelector('.basket');

        buttonBasket.addEventListener('click', () => {
          mainBlock.classList.add('display-none');
          basketDiv.classList.remove('display-none');

          buildDetailBasket();
          refreshTotalSumHeader(data);
        });
      };
      basketBlock();

      // перерисовка содержимого страницы корзины в соответствии с допустимым кол-вом записей на странице по событию 'input' на ITEMS:
      const itemsPerPage = <HTMLInputElement>document.querySelector('.items-per-page');
      itemsPerPage.addEventListener('input', function () {
        // console.log('событие input=', this.value);
        buildDetailBasket();
      });

      //отрисовка корзины в зависимости от кол-ва товаров, кол-ва допустимых записей, номера страницы
      const buildDetailBasket = () => {
        (document.querySelector('.prod-items') as HTMLElement).innerHTML = '';
        console.log('in buildDetailBasket', basketRender);

        const quantityId: number = getNonNullKeys(basketRender);
        const quantityInInput: string = itemsPerPage.value;
        const numberOfPage = document.querySelector('.page-numbers-span')!.textContent;
        console.log('buildDetailBasket()=', quantityId, +quantityInInput, +numberOfPage!);

        splitIdByPage(numberOfPage);

        //функция меняет HTML корзины в зависимости от номера страницы
        function splitIdByPage(numberOfPage: string | null | undefined) {
          if (quantityId > +quantityInInput * (+numberOfPage! - 1)) {
            if (quantityId > +quantityInInput * +numberOfPage!) {
              for (let i = +quantityInInput * (+numberOfPage! - 1); i < +quantityInInput * +numberOfPage!; i++) {
                console.log('сработал splitIdByPage-1');
                getBasketInfo(Object.keys(basketRender)[i]);
              }
            } else {
              for (let i = +quantityInInput * (+numberOfPage! - 1); i < Object.keys(basketRender).length; i++) {
                console.log('сработал splitIdByPage-2');
                // console.log('Object.keys(basketRender)[i]=', Object.keys(basketRender)[i]);
                getBasketInfo(Object.keys(basketRender)[i]);
              }
            }
          }
        }
      };

      const pageNumbersDel = <HTMLElement>document.querySelector('.page-numbers-del');
      const pageNumbersAdd = <HTMLElement>document.querySelector('.page-numbers-add');
      const pageNumber = <HTMLElement>document.querySelector('.page-numbers-span');
      //изменение номера страницы
      addDelDiv(pageNumbersDel, 1, pageNumbersAdd, 9, pageNumber, buildDetailBasket);

      //функция навешивает листенеры на две кнопки, меняет значение HTMLElement, запускает функцию
      function addDelDiv(
        del: HTMLElement,
        delMin: number,
        add: HTMLElement,
        addMax: number,
        elem: HTMLElement,
        func?: Function
      ): void {
        del.addEventListener('click', () => {
          if (+elem.textContent! == delMin) {
            return;
          }
          console.log('сработала кнопка Del');
          elem.textContent = (+elem.textContent! - 1).toString();
          if (func !== undefined) {
            func();
          }
        });
        add.addEventListener('click', () => {
          if (+elem.textContent! == addMax) {
            return;
          }
          console.log('сработала кнопка Add');
          elem.textContent = (+elem.textContent! + 1).toString();
          if (func !== undefined) {
            func();
          }
        });
      }

      const getBasketInfo = (id: string) => {
        const idNum = parseInt(id) - 1;
        console.log('getBasketInfo-id=', id, 'data.products[...][id]=', data[idNum]['id']);

        const prodCartItem = document.createElement('div');
        prodCartItem.classList.add('prod-cart-item');

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemI = document.createElement('div');
        itemI.classList.add('item-i');
        itemI.textContent = `${data[idNum]['id']}`;

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');

        const itemInfoImg = document.createElement('img');
        itemInfoImg.src = data[idNum]['thumbnail'];

        const productTitle = document.createElement('div');
        productTitle.classList.add('product-title');

        const productTitleH3 = document.createElement('h3');
        productTitleH3.textContent = data[idNum]['title'];

        const productDescription = document.createElement('div');
        productDescription.classList.add('product-description');
        productDescription.textContent = data[idNum]['description'];

        const productOther = document.createElement('div');
        productOther.classList.add('product-other');

        const divRating = document.createElement('div');
        divRating.textContent = 'Rating:' + data[idNum]['rating'].toString();

        const divDiscount = document.createElement('div');
        divDiscount.textContent = 'Discount:' + data[idNum]['discountPercentage'].toString();

        const itemDetailP = document.createElement('div');
        itemDetailP.classList.add('item-detail-p');

        const numberControl = document.createElement('div');
        numberControl.classList.add('number-control');

        const stockControl = document.createElement('div');
        stockControl.classList.add('stock-control');
        stockControl.textContent = (data[idNum]['stock'] - 1).toString();

        const quantityControl = document.createElement('div');
        quantityControl.classList.add('quantity-control');

        const quantityControlSpan = document.createElement('span');
        quantityControlSpan.classList.add('quantity-control-span');
        quantityControlSpan.textContent = `${basketRender[id]}`;

        const amountControl = document.createElement('div');
        amountControl.classList.add('amount-control');
        amountControl.textContent = (data[idNum]['price'] * basketRender[id]).toString();

        const plusButton = document.createElement('button');
        plusButton.classList.add('quantity-control-plus');
        plusButton.textContent = '+';
        plusButton.addEventListener('click', () => {
          if (+stockControl.textContent! == 0) {
            return;
          }
          quantityControlSpan.textContent = (parseInt(quantityControlSpan.textContent!, 10) + 1).toString();
          basketRender[id] = +quantityControlSpan.textContent;
          refreshTotalItemInBasket();
          stockControl.textContent = (+stockControl.textContent! - 1).toString();
          amountControl.textContent = (+amountControl.textContent! + data[idNum]['price']).toString();
          setLocalStorage('basket', basketRender);
          refreshTotalSumHeader(data);
        });

        const minusButton = document.createElement('button');
        minusButton.classList.add('quantity-control-minus');
        minusButton.textContent = '-';
        minusButton.addEventListener('click', () => {
          quantityControlSpan.textContent = (+quantityControlSpan.textContent! - 1).toString();
          amountControl.textContent = (+amountControl.textContent! - data[idNum]['price']).toString();
          basketRender[id] = +quantityControlSpan.textContent;
          refreshTotalItemInBasket();
          setLocalStorage('basket', basketRender);
          refreshTotalSumHeader(data);
          if (+quantityControlSpan.textContent == 0) {
            delete basketRender[id];
            setLocalStorage('basket', basketRender);
            refreshTotalSumHeader(data);
            buildDetailBasket();

            return;
          }

          // amountControl.textContent = (+amountControl.textContent! - data[1][]).toString();
          stockControl.textContent = (+stockControl.textContent! + 1).toString();
          refreshTotalSumHeader(data);
        });

        productTitle.prepend(productTitleH3);
        productOther.prepend(divRating, divDiscount);
        itemDetailP.prepend(productTitle, productDescription, productOther);
        itemInfo.prepend(itemInfoImg, itemDetailP);
        quantityControl.prepend(plusButton, quantityControlSpan, minusButton);
        numberControl.prepend(stockControl, quantityControl, amountControl);
        cartItem.prepend(itemI, itemInfo, numberControl);
        prodCartItem.prepend(cartItem);
        // console.log('document.querySelector(.prod-items)=', document.querySelector('.prod-items'));
        document.querySelector('.prod-items')?.append(prodCartItem);
      };
    })
    .catch((e) => console.log(e));
};
