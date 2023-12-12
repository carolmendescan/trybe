import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import {
  createProductElement,
  createCartProductElement,
  sumOfProducts } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const cointainerProducts = document.querySelector('.products');
const cart = document.querySelector('.cart__products');

const showProductOnCart = () => {
  const getInfo = JSON.parse(localStorage.getItem('cartProducts')) || [];
  getInfo.forEach(async (produto) => {
    const response = await fetchProduct(produto);
    cart.appendChild(createCartProductElement(response));
    sumOfProducts();
  });
};

const loadingPage = () => {
  const message = document.createElement('h3');
  message.className = 'loading';
  message.innerText = 'carregando...';
  cointainerProducts.appendChild(message);
};
loadingPage();

const showErrorMessage = () => {
  const errorMessage = document.createElement('h3');
  errorMessage.className = 'error';
  errorMessage.innerText = 'Algum erro ocorreu, recarregue a página e tente novamente';
  cointainerProducts.appendChild(errorMessage);
};

const productList = async () => {
  try {
    const response = await fetchProductsList('computador');
    cointainerProducts.innerHTML = '';
    const getSectionHTML = document.querySelector('.products');
    response.forEach((obj) => {
      const data = createProductElement(obj);
      getSectionHTML.appendChild(data);
    });
  } catch (error) {
    showErrorMessage();
  }
};
productList();
showProductOnCart();
