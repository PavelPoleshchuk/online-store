import './modal-render.css';

const errorMessage = document.createElement('div');

function checkName(name: string) {
  errorMessage.classList.add('error');
  if (errorMessage.innerHTML !== '') errorMessage.remove();

  const nameArray = name.trim().split(' ');
  const [firstName, lastName] = [...nameArray];

  if (name.match(/[0-9]/gi)) {
    errorMessage.innerHTML = `only letters please`;
    document.querySelector('.personal-name')?.append(errorMessage);
    return false;
  }

  if (name.length > 30) {
    errorMessage.innerHTML = `name too long`;
    document.querySelector('.personal-name')?.append(errorMessage);
    return false;
  }

  if (nameArray.length !== 2) {
    errorMessage.innerHTML = `firstname lastname`;
    (document.querySelector('.personal-name input') as HTMLInputElement).focus();
    document.querySelector('.personal-name')?.append(errorMessage);
    return false;
  }

  if (typeof firstName !== 'undefined' && firstName.length < 3) {
    errorMessage.innerHTML = `name too short`;
    document.querySelector('.personal-name')?.append(errorMessage);
    return false;
  }

  if (typeof lastName !== 'undefined' && lastName.length < 3) {
    errorMessage.innerHTML = `lastname too short`;
    document.querySelector('.personal-name')?.append(errorMessage);
    return false;
  }
  return true;
}

function checkTelNumber(telChar: string) {
  errorMessage.classList.add('error');
  if (errorMessage.innerHTML !== '') errorMessage.remove();

  if (telChar.length > 12) {
    errorMessage.innerHTML = `too long number`;
    document.querySelector('.personal-phone')?.append(errorMessage);
    (document.querySelector('.personal-phone input') as HTMLInputElement).value = telChar.slice(0, -1);
    return false;
  }

  if (telChar.match(/[^0-9]/)) {
    errorMessage.innerHTML = `only digits`;
    document.querySelector('.personal-phone')?.append(errorMessage);
    (document.querySelector('.personal-phone input') as HTMLInputElement).value = telChar.slice(0, -1);
    return false;
  }

  if (telChar.length < 9) {
    errorMessage.innerHTML = `too short number`;
    document.querySelector('.personal-phone')?.append(errorMessage);
    return false;
  }
  return true;
}

function checkCardNumber(cardNumber: string, e: KeyboardEvent | Event) {
  errorMessage.classList.add('error');
  if (errorMessage.innerHTML !== '') errorMessage.remove();

  if (cardNumber.length === 3) {
    (document.querySelector(
      '.card-number img'
    ) as HTMLImageElement).src = `https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg`;
  }

  if (cardNumber.match(/[^0-9\s]/)) {
    errorMessage.innerHTML = `only digits`;
    (document.querySelector('.card-number input') as HTMLInputElement).value = cardNumber.slice(0, -1);
    document.querySelector('.card-number')?.append(errorMessage);
    return false;
  }

  if ((e as KeyboardEvent).code !== 'Backspace') {
    if (cardNumber.length === 4 || cardNumber.length === 9 || cardNumber.length === 14) {
      (document.querySelector('.card-number input') as HTMLInputElement).value += ' ';
    }
  }

  if (cardNumber.length > 18) {
    (document.querySelector('.card-number input') as HTMLInputElement).value = cardNumber.slice(0, -1);
    (document.querySelector('.valid-data input') as HTMLInputElement).focus();
  }

  if (cardNumber.length < 17) {
    errorMessage.innerHTML = `too short`;
    document.querySelector('.card-number')?.append(errorMessage);
    return false;
  }

  return true;
}

function checkValidField(value: string) {
  errorMessage.classList.add('error');
  if (errorMessage.innerHTML !== '') errorMessage.remove();

  if (value.length === 1 && parseInt(value) > 1) {
    errorMessage.innerHTML = `month`;
    document.querySelector('.valid-data')?.append(errorMessage);
    (document.querySelector('.valid-data input') as HTMLInputElement).value = value.slice(0, -1);
    return false;
  }

  if (value.length === 2) {
    (document.querySelector('.valid-data input') as HTMLInputElement).value += `/`;
  }

  if (value.length === 2 && value[1].match(/[^1-2]/)) {
    errorMessage.innerHTML = `month`;
    document.querySelector('.valid-data')?.append(errorMessage);
    (document.querySelector('.valid-data input') as HTMLInputElement).value = value.slice(0, -1);
    return false;
  }

  if (value.length === 4 && value[3] !== '2') {
    errorMessage.innerHTML = `year`;
    document.querySelector('.valid-data')?.append(errorMessage);
    (document.querySelector('.valid-data input') as HTMLInputElement).value = value.slice(0, -1);
    return false;
  }

  if (value.length === 5 && value[4].match(/[^3-9]/)) {
    errorMessage.innerHTML = `year`;
    document.querySelector('.valid-data')?.append(errorMessage);
    (document.querySelector('.valid-data input') as HTMLInputElement).value = value.slice(0, -1);
    return false;
  }

  if (value.length > 5) {
    (document.querySelector('.valid-data input') as HTMLInputElement).value = value.slice(0, -1);
    (document.querySelector('.cvv-data input') as HTMLInputElement).focus();
    return false;
  }

  return true;
}

function checkAdress(adress: string) {
  errorMessage.classList.add('error');
  if (errorMessage.innerHTML !== '') errorMessage.remove();

  const adressArray = adress.trim().split(' ');
  const [, , home] = [...adressArray];

  if (adressArray.length < 3 || home.match(/[^0-9]/gi)) {
    errorMessage.innerHTML = `city street building`;
    document.querySelector('.personal-adress')?.append(errorMessage);
    return false;
  }
  return true;
}

function checkEmail(email: string) {
  errorMessage.classList.add('error');
  if (errorMessage.innerHTML !== '') errorMessage.remove();

  if (email === '') {
    errorMessage.innerHTML = `email required`;
    document.querySelector('.personal-email')?.append(errorMessage);
    return false;
  }

  if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    errorMessage.innerHTML = `wrong format`;
    document.querySelector('.personal-email')?.append(errorMessage);
    return false;
  }
  return true;
}

function checkCvvField(value: string) {
  errorMessage.classList.add('error');
  if (errorMessage.innerHTML !== '') errorMessage.remove();

  if (value.length < 1) {
    errorMessage.innerHTML = `required field`;
    document.querySelector('.cvv-data')?.append(errorMessage);
    return false;
  }

  if (value.match(/[^0-9\s]/)) {
    errorMessage.innerHTML = `only digits`;
    (document.querySelector('.cvv-data input') as HTMLInputElement).value = value.slice(0, -1);
    document.querySelector('.cvv-data')?.append(errorMessage);
    return false;
  }

  if (value.length > 3) {
    (document.querySelector('.cvv-data input') as HTMLInputElement).value = value.slice(0, -1);
    return false;
  }

  return true;
}

const modalRender = () => {
  const pageWrapper = document.querySelector('.wrapper');

  const modalWindowWrapper = document.createElement('div');
  modalWindowWrapper.classList.add('modal-window');

  const modalWindowContent = document.createElement('div');
  modalWindowContent.classList.add('modal-content');

  const modalWindowContentData = document.createElement('div');
  modalWindowContentData.classList.add('content-data');

  const personalData = document.createElement('div');
  personalData.classList.add('personal-data');

  const personalDataH2 = document.createElement('h2');
  personalDataH2.innerHTML = `Personal details`;

  const personalDataName = document.createElement('div');
  personalDataName.classList.add('personal-name');
  personalDataName.innerHTML = `Name: `;
  const personalDataNameInput = document.createElement('input');
  personalDataNameInput.placeholder = `John Doe`;
  personalDataNameInput.type = `text`;
  personalDataName.append(personalDataNameInput);
  personalDataNameInput.addEventListener('change', (e) => {
    checkName((e.target as HTMLInputElement).value);
  });

  const personalDataPhone = document.createElement('div');
  personalDataPhone.classList.add('personal-phone');
  const personalDataPhoneInput = document.createElement('input');
  personalDataPhone.innerHTML = `Phone: `;
  personalDataPhoneInput.placeholder = `00570353161`;
  personalDataPhoneInput.type = `tel`;
  personalDataPhone.append(personalDataPhoneInput);
  personalDataPhoneInput.addEventListener('input', function () {
    checkTelNumber(this.value);
  });

  const personalDataAdress = document.createElement('div');
  personalDataAdress.classList.add('personal-adress');
  personalDataAdress.innerHTML = `Adress: `;
  const personalDataAdressInput = document.createElement('input');
  personalDataAdressInput.placeholder = `Minsk Zybicka 6`;
  personalDataAdressInput.type = 'text';
  personalDataAdress.append(personalDataAdressInput);
  personalDataAdressInput.addEventListener('input', function () {
    checkAdress(this.value);
  });

  const personalDataEmail = document.createElement('div');
  personalDataEmail.classList.add('personal-email');
  personalDataEmail.innerHTML = `E-mail: `;
  const personalDataEmailInput = document.createElement('input');
  personalDataEmailInput.type = 'email';
  personalDataEmailInput.placeholder = `box@mail.com`;
  personalDataEmail.append(personalDataEmailInput);
  personalDataEmailInput.addEventListener('input', function () {
    checkEmail(this.value);
  });

  personalData.append(personalDataH2, personalDataName, personalDataPhone, personalDataAdress, personalDataEmail);

  const cardData = document.createElement('div');
  cardData.classList.add('card-data');

  const cardDataH2 = document.createElement('h2');
  cardDataH2.innerHTML = `Credit cart Details`;

  const cardWrapper = document.createElement('div');
  cardWrapper.classList.add('card-wrapper');

  const cardNumber = document.createElement('div');
  cardNumber.classList.add('card-number');

  const cardNumberImg = document.createElement('img');
  cardNumberImg.src = `https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71`;
  cardNumberImg.alt = `Mastercard`;

  const cardNumberInput = document.createElement('input');
  cardNumberInput.type = `text`;
  cardNumberInput.placeholder = `Card Number`;
  cardNumberInput.addEventListener('keydown', function (e) {
    checkCardNumber(this.value, e);
  });

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');

  const cardInfoValid = document.createElement('div');
  cardInfoValid.classList.add('valid-data');
  cardInfoValid.innerHTML = `VALID: `;
  const cardInfoValidInput = document.createElement('input');
  cardInfoValidInput.type = `text`;
  cardInfoValidInput.placeholder = `MM/YY`;
  cardInfoValid.append(cardInfoValidInput);
  cardInfoValidInput.addEventListener('input', function () {
    checkValidField(this.value);
  });

  const cardInfoCvv = document.createElement('div');
  cardInfoCvv.classList.add('cvv-data');
  cardInfoCvv.innerHTML = `CVV: `;
  const cardInfoCvvInput = document.createElement('input');
  cardInfoCvvInput.type = `text`;
  cardInfoCvvInput.placeholder = `***`;
  cardInfoCvv.append(cardInfoCvvInput);
  cardInfoCvvInput.addEventListener('input', function () {
    checkCvvField(this.value);
  });

  cardInfo.append(cardInfoValid, cardInfoCvv);
  cardWrapper.append(cardNumber, cardInfo);
  cardNumber.append(cardNumberImg, cardNumberInput);
  cardData.append(cardDataH2, cardWrapper);

  const modalWindowConfirmButton = document.createElement('div');
  modalWindowConfirmButton.classList.add('confirm-button', 'button');
  modalWindowConfirmButton.innerHTML = `Confirm`;
  modalWindowConfirmButton.addEventListener('click', function (e) {
    const requredError = document.createElement('div');
    if (
      checkName(personalDataNameInput.value) &&
      checkTelNumber(personalDataPhoneInput.value) &&
      checkAdress(personalDataAdressInput.value) &&
      checkEmail(personalDataEmailInput.value) &&
      checkCardNumber(cardNumberInput.value, e) &&
      checkValidField(cardInfoValidInput.value) &&
      checkCvvField(cardInfoCvvInput.value)
    ) {
      requredError.classList.add('success');
      requredError.innerHTML = `Success! Form sumbitted...`;
      document.querySelector('.modal-content')?.insertBefore(requredError, modalWindowConfirmButton);
      setTimeout(() => {
        localStorage.removeItem('inCart');
        location.href = '/';
      }, 2000);
    }
  });

  modalWindowContentData.append(personalData, cardData);
  modalWindowContent.append(modalWindowContentData, modalWindowConfirmButton);
  modalWindowWrapper.append(modalWindowContent);
  pageWrapper?.append(modalWindowWrapper);

  modalWindowWrapper.addEventListener('click', function (e) {
    if (e.target === this) {
      modalWindowWrapper.remove();
      if (location.pathname == `/cart`) {
        location.href = `/cart`;
      }
    }
  });
};

export { modalRender };
