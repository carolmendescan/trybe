import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async() => {
    await fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async() => {
    const URL = 'https://api.mercadolibre.com/items/MLB1405519561';
    await fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Retorno da função fetchProductsList com o argumento MLB1405519561 é uma estrutura de dados igual ao objeto product', async() => {
    const response = await fetchProduct('MLB1405519561');
    expect(response).toEqual(product);
  });

  it('Ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: ID não informado', async() => {
    const response = await fetchProduct();
    expect(response).toEqual('ID não informado');
  });
});
