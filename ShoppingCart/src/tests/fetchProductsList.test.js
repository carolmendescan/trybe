import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async() => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async() => {
    await fetchProductsList('computador')
    const URL = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(URL);
  });

  it('Retorno da função fetchProductsList com o argumento computador é uma estrutura de dados igual ao objeto computadorSearch', async() => {
    const response = await fetchProductsList('computador');
    expect(response).resolves.toEqual(computadorSearch);
  });

  it('Ao chamar a função fetchProductsList sem argumento, retorna um erro com a mensagem: Termo de busca não informado', async() => {
    const response = await fetchProductsList();
    expect(response).toEqual('Termo de busca não informado');
  });
});
