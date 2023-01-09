import './style.css';

const categoryFilter = () => {
  const filterList = document.querySelector('.category-filter__list');
  const categoriesArray = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
  ];

  for (let i = 0; i < categoriesArray.length; i++) {
    const categoryItem = document.createElement('div');
    categoryItem.classList.add('category-filter__item', 'checkbox-item');

    const categoryItemLabel = document.createElement('label');
    categoryItemLabel.innerHTML = categoriesArray[i];
    categoryItemLabel.setAttribute('for', categoriesArray[i]);
    categoryItem.appendChild(categoryItemLabel);

    const categoryCheckBox = document.createElement('input');
    categoryCheckBox.type = 'checkbox';
    categoryCheckBox.id = categoriesArray[i];
    categoryCheckBox.classList.add('checkbox');
    categoryCheckBox.value = categoriesArray[i];
    categoryItem.prepend(categoryCheckBox);

    filterList?.appendChild(categoryItem);
  }
};

export { categoryFilter };
