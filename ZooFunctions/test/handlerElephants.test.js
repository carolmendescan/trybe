const handlerElephants = require('../src/handlerElephants');

describe('Testes da função HandlerElephants', () => {
  it('is a function', () => {
    expect(typeof handlerElephants).toBe('function');
  });
  it('testa param count', () => {
    expect(handlerElephants('count')).toBe(4);
  });
  it('testa param names', () => {
    expect(handlerElephants('names')).toEqual(['Ilana', 'Orval', 'Bea', 'Jefferson']);
  });
  it('testa param averageAge', () => {
    expect(handlerElephants('averageAge')).toBe(10.5);
  });
  it('testa param location', () => {
    expect(handlerElephants('location')).toEqual('NW');
  });
  it('testa param popularity', () => {
    expect(handlerElephants('popularity')).toBe(5);
  });
  it('testa param availability', () => {
    expect(handlerElephants('availability')).toEqual(['Friday', 'Saturday', 'Sunday', 'Tuesday']);
  });
  it('testa param null', () => {
    expect(handlerElephants()).toEqual(undefined);
  });
  it('testa param diferente de string', () => {
    expect(handlerElephants(3)).toEqual('Parâmetro inválido, é necessário uma string');
  });
  it('testa param diferente do esperado', () => {
    expect(handlerElephants('mesa')).toEqual(null);
  });
});
