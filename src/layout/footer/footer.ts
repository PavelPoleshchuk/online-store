import { inCartCheck } from '../../components/cart-checker/cartChecker';
import './footer.css';

const footerRender = () => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');

  const repository = <HTMLElement>document.createElement('div');
  repository.classList.add('repository');

  const repositoryLink = document.createElement('a');
  repositoryLink.href = `https://github.com/alexbrestby/online-store`;
  repositoryLink.target = `_blank`;
  repositoryLink.innerHTML = `Github`;
  repository.append(repositoryLink);

  const year = <HTMLElement>document.createElement('div');
  year.classList.add('year');
  year.innerHTML = `2022`;

  const rsSchool = <HTMLElement>document.createElement('div');
  rsSchool.classList.add('rs-school');

  const rsSchoolLink = document.createElement('a');
  rsSchoolLink.href = `https://rs.school/js/`;
  rsSchoolLink.target = `_blank`;

  const rsSchoolImg = document.createElement('img');
  rsSchoolImg.src = `https://rs.school/images/rs_school_js.svg`;
  rsSchoolImg.alt = `rs-school logo`;
  rsSchoolLink.append(rsSchoolImg);
  rsSchool.append(rsSchoolLink);

  footer.append(repository, year, rsSchool);
  document.querySelector('.wrapper')?.append(footer);
  inCartCheck();
};

export { footerRender };
