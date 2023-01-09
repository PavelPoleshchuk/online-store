import './style.css';

const noFoundRender = (path: string) => {
  const noFoundHeader = document.createElement('h1');
  noFoundHeader.classList.add('render-no-found');
  let renderArea: HTMLElement;

  if (path === '/') {
    renderArea = document.querySelector('.render-area') as HTMLElement;
    noFoundHeader.innerHTML = 'No products found!';
    renderArea.style.placeContent = 'center';
    renderArea.innerHTML = '';
    renderArea.appendChild(noFoundHeader);
  } else if (path === '/cart') {
    renderArea = document.querySelector('.products-items') as HTMLElement;
    renderArea.style.display = 'flex';
    renderArea.style.height = '100%';
    noFoundHeader.innerHTML = 'Cart is empty!';
    renderArea.style.placeItems = 'center';
    renderArea.style.justifyContent = 'center';
    renderArea.innerHTML = '';
    renderArea.appendChild(noFoundHeader);
  } else {
    renderArea = document.querySelector('.main') as HTMLElement;
    noFoundHeader.innerHTML = 'Error 404. Page no found!';
    renderArea.style.placeItems = 'center';
    renderArea.style.justifyContent = 'center';
    renderArea.innerHTML = '';
    renderArea.appendChild(noFoundHeader);
  }
};

export { noFoundRender };
