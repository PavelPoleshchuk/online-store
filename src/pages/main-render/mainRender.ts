import { categoryFilter } from './category-filter/categoryFilter';
import { brandFilter } from './brand-filter/brandFilter';
import { priceSlider } from './price-slider/priceSlider';
import { stockSlider } from './stock-slider/stockSlider';

const mainRender = () => {
  categoryFilter();
  brandFilter();
  priceSlider();
  stockSlider();
};

export { mainRender };
