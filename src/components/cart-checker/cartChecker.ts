import { cartItemRender } from '../../pages/cart-render/cartItem-render/cartItemRender';
import { IstorageItem } from '../../types/types';

const inCartArray = (JSON.parse(localStorage.getItem('inCart') as string) as IstorageItem[]) || ([] as IstorageItem[]);
export const inCartCheck = (obj?: { id?: number; price?: number; counter?: number }, e?: Event) => {
  const productCounter = <HTMLElement>document.querySelector('.total-item');
  const productSum = <HTMLElement>document.querySelector('.total-sum');
  if (typeof e !== 'undefined') {
    if ((e.target as HTMLElement).classList.contains('item-wrapper-button-buy')) {
      if (!inCartArray.some((item: IstorageItem) => item.id === obj?.id)) {
        inCartArray.push(obj as IstorageItem);
        (e.target as HTMLElement).innerHTML = `drop from cart`;
        (e.target as HTMLElement).classList.add('added');
      } else {
        for (let i = 0; i < inCartArray.length; i++) {
          if (inCartArray[i].id === obj?.id) {
            inCartArray.splice(i, 1);
          }
        }
        (e.target as HTMLElement).innerHTML = `add to cart`;
        (e.target as HTMLElement).classList.remove('added');
      }
    } else if ((e.target as HTMLElement).classList.contains('button-minus')) {
      for (let i = 0; i < inCartArray.length; i++) {
        if (inCartArray[i].id === obj?.id) {
          inCartArray[i].counter--;
          if (inCartArray[i].counter === 0) {
            inCartArray.splice(i, 1);
            (document.querySelector('.products-items') as HTMLElement).innerHTML = '';
            cartItemRender(
              inCartArray,
              +(document.querySelector('.cart-limit input') as HTMLInputElement)?.value,
              +(document.querySelector('.cart-pages span') as HTMLElement)?.innerHTML
            );
          }
        }
      }
    } else if ((e.target as HTMLElement).classList.contains('button-plus')) {
      for (let i = 0; i < inCartArray.length; i++) {
        if (inCartArray[i].id === obj?.id) {
          inCartArray[i].counter++;
        }
      }
    } else if ((e.target as HTMLElement).classList.contains('add-button')) {
      if ((e.target as HTMLElement).innerHTML === 'add to cart') {
        inCartArray.push(obj as IstorageItem);
        (e.target as HTMLElement).innerHTML = 'drop from cart';
        (e.target as HTMLElement).classList.add('added');
      } else {
        for (let i = 0; i < inCartArray.length; i++) {
          if (inCartArray[i].id === obj?.id) {
            inCartArray.splice(i, 1);
          }
        }
        (e.target as HTMLElement).innerHTML = 'add to cart';
        (e.target as HTMLElement).classList.remove('added');
      }
    } else if ((e.target as HTMLElement).classList.contains('buy-button')) {
      if (!inCartArray.some((item: IstorageItem) => item.id === obj?.id)) {
        inCartArray.push(obj as IstorageItem);
      }
      (document.querySelector('.add-button') as HTMLElement).innerHTML = 'drop from cart';
      (document.querySelector('.add-button') as HTMLElement).classList.add('added');
    }
    localStorage.setItem('inCart', JSON.stringify(inCartArray));
  } else {
    return inCartArray.some((item: IstorageItem) => item.id === obj?.id);
  }

  console.log('cart rechecked');
  const counter: number = inCartArray.reduce((acc: number, elem: IstorageItem) => acc + elem.counter, 0);
  const sum = inCartArray.reduce((acc: number, elem: IstorageItem) => acc + elem.counter * elem.price, 0);
  let stringCounter = `${counter}`;
  if (counter < 10) stringCounter = `&nbsp;${counter}`;
  productCounter.innerHTML = stringCounter;
  productSum.innerHTML = `${sum}`;
};
