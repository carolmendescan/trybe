const productDetails = require('../src/productDetails');
/*
  A função productDetails recebe duas strings que representam nomes de produtos, e retorna um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara')

  // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  Escreva pelo menos cinco testes para essa função para garantir que a implementação de productDetails está correta.

*/

describe('6 - Implemente os casos de teste para a função `productDetails`', () => {
  it('Teste se productDetails é uma função.', () => {
    expect(typeof productDetails).toBe('function')
  });
  it('Teste se o retorno da função é um array.', () => {
    expect(Array.isArray(productDetails('item1', 'item2'))).toBeTruthy()
  });
  it('Teste se o array retornado pela função contém dois itens dentro.', () => {
    expect(Object.keys(productDetails('item1', 'item2')).length).toBe(2);
  });
  it('Teste se os dois itens dentro do array retornado pela função são objetos.', () => {
    expect(typeof (Object.keys(productDetails('item1', 'item2')))).toEqual('object')
  });
  it('Teste se quando passado parâmetros diferentes entre si, os dois objetos também são diferentes entre si.', () => {
    expect(productDetails('item1', 'item2')[0]).not.toEqual(productDetails('item1', 'item2')[1])
  });
  it('Teste se os dois productIds terminam com 123.', () => {
    expect(productDetails()[0].details.productId).toMatch('123')
    expect(productDetails()[1].details.productId).toMatch('123')
  });
});
