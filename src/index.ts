import './global.css';
import { headerRender } from './layout/header/header';
import { mainRender } from './pages/main-render/mainRender';
import { stateCheck } from './components/state-check/stateCheck';
import { cartRender } from './pages/cart-render/cartRender';
import { productRender } from './pages/product-render/productRender';
import { footerRender } from './layout/footer/footer';
import { globalFilter } from './components/global-filter/globalFilter';
import { noFoundRender } from './pages/main-render/no-found-render/noFoundRender';

const init = (): void => {
  {
    headerRender();
    if (location.pathname === '/') {
      mainRender();
      stateCheck();
      globalFilter();
    } else if (location.pathname === '/cart') {
      cartRender();
    } else if (location.pathname.match(/\/product_\d+/)) {
      stateCheck();
      productRender();
    } else {
      console.log('404');
      noFoundRender(location.href);
    }
    footerRender();
  }
};

document.addEventListener('DOMContentLoaded', init);
