import './product-render.css';
import { HistoryState, Iproduct } from '../../types/types';
import { inCartCheck } from '../../components/cart-checker/cartChecker';
import { modalRender } from '../modal-render/modalRender';

const productRender = (id?: string) => {
  (document.querySelector('.header-search') as HTMLElement).style.display = 'none';

  const globalState = history.state as HistoryState;
  const productId = id || (globalState.product as string);

  const productDetailPage = document.createElement('div');
  productDetailPage.classList.add('product-detail-page');

  const breadcrumbWrapper = document.createElement('div');
  breadcrumbWrapper.classList.add('link-navigation');

  const productWrapper = document.createElement('div');
  productWrapper.classList.add('product-wrapper');

  const renderArea = <HTMLElement>document.querySelector('.main');
  renderArea.innerHTML = '';

  fetch(`https://dummyjson.com/products/${productId}`)
    .then((result) => result.json())
    .then((data: Iproduct) => {
      const mainCrumb = document.createElement('div');
      mainCrumb.innerHTML = `STORE`;
      breadcrumbWrapper.append(mainCrumb);

      const categoryCrumb = <HTMLElement>document.createElement('div');
      categoryCrumb.innerHTML = data.category;
      breadcrumbWrapper.append(categoryCrumb);

      const brandCrumb = document.createElement('div');
      brandCrumb.innerHTML = data.brand;
      breadcrumbWrapper.append(brandCrumb);

      const titleCrumb = document.createElement('div');
      titleCrumb.innerHTML = data.title;
      breadcrumbWrapper.append(titleCrumb);

      const productTitle = document.createElement('div');
      productTitle.classList.add('product-title');

      const productTitleH1 = document.createElement('div');
      productTitleH1.innerHTML = data.title;

      const productData = document.createElement('div');
      productData.classList.add('product-data');

      const productPhotos = document.createElement('div');
      productPhotos.classList.add('product-photos');

      const slides = document.createElement('div');
      slides.classList.add('slides');

      let imagesCount;
      data.images.length > 4 ? (imagesCount = 4) : (imagesCount = data.images.length);
      for (let i = 0; i < imagesCount; i++) {
        const slide = document.createElement('img');
        slide.alt = `${data.title}-${i}`;
        slide.src = data.images[i];
        slides.append(slide);
      }
      slides.addEventListener('click', function (e) {
        const smallImgSrc = (e.target as HTMLImageElement).currentSrc;
        grandPhotoImg.src = smallImgSrc;
      });

      const grandPhoto = document.createElement('div');
      grandPhoto.classList.add('grand-photo');

      const grandPhotoImg = document.createElement('img');
      grandPhotoImg.src = data.thumbnail;
      grandPhotoImg.alt = data.title;
      grandPhoto.append(grandPhotoImg);

      productPhotos.append(slides, grandPhoto);

      const productInfo = document.createElement('div');
      productInfo.classList.add('product-info');

      for (let i = 2; i < 9; i++) {
        const property = document.createElement('div');
        property.classList.add('property');

        const propertyh3 = document.createElement('h3');
        propertyh3.innerHTML = Object.keys(data)[i];

        const propertyP = document.createElement('p');
        propertyP.innerHTML = data[Object.keys(data)[i]] as string;

        property.append(propertyh3, propertyP);
        productInfo.append(property);
      }

      const productAddToCart = document.createElement('div');
      productAddToCart.classList.add('add-to-cart');

      const bigPrice = document.createElement('div');
      bigPrice.classList.add('big-price');
      bigPrice.innerHTML = `&#8364; ${data.price}`;

      const addToCartButton = document.createElement('div');
      addToCartButton.classList.add('button', 'add-button');
      if (inCartCheck({ id: data.id, price: data.price })) {
        addToCartButton.textContent = `drop from cart`;
        addToCartButton.classList.add('added');
      } else {
        addToCartButton.textContent = `add to cart`;
        addToCartButton.classList.remove('added');
      }
      addToCartButton.addEventListener('click', function (e) {
        inCartCheck({ id: data.id, price: data.price, counter: 1 }, e);
      });

      const buyNowButton = document.createElement('div');
      buyNowButton.classList.add('button', 'buy-button');
      buyNowButton.innerHTML = `Buy Now`;
      buyNowButton.addEventListener('click', function (e) {
        inCartCheck({ id: data.id, price: data.price, counter: 1 }, e);
        modalRender();
      });

      productAddToCart.append(bigPrice, addToCartButton, buyNowButton);

      productData.append(productPhotos, productInfo, productAddToCart);
      productTitle.append(productTitleH1);
      productWrapper.append(productTitle, productData);
    })
    .catch((e) => console.log(e));

  productDetailPage.append(breadcrumbWrapper, productWrapper);
  renderArea.append(productDetailPage);
};

export { productRender };
