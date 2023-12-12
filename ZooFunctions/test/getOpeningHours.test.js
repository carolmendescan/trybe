const getOpeningHours = require('../src/getOpeningHours');

describe('Testes da função getOpeningHours', () => {
  it('is a function', () => {
    expect(typeof getOpeningHours).toBe('function');
  });
  it('Testar sem os argumentos', () => {
    const horarios = {
      Friday: { close: 8, open: 10 },
      Monday: { close: 0, open: 0 },
      Saturday: { close: 10, open: 8 },
      Sunday: { close: 8, open: 8 },
      Thursday: { close: 8, open: 10 },
      Tuesday: { close: 6, open: 8 },
      Wednesday: { close: 6, open: 8 },
    };
    expect(getOpeningHours()).toEqual(horarios);
  });
  it('O nome do dia da semana passado como argumento tem que ser em inglês', () => {
    expect(() => getOpeningHours('Terça', '10:30-AM')).toThrow('The day must be valid. Example: Monday');
  });
  it('O horário precisa ter a hora na formatação 0 a 12', () => {
    expect(() => getOpeningHours('Tuesday', '43:30-AM')).toThrow('The hour must be between 0 and 12');
  });
  it('O horário precisa ter os minutos na formatação 0 a 59', () => {
    expect(() => getOpeningHours('Tuesday', '10:70-AM')).toThrow('The minutes must be between 0 and 59');
  });
  it('A abreviação deve estar na formatação AM ou PM', () => {
    expect(() => getOpeningHours('Tuesday', '10:30-kM')).toThrow('The abbreviation must be \'AM\' or \'PM\'');
  });
  it('A hora precisa ser dada em números', () => {
    expect(() => getOpeningHours('Tuesday', 'aa:70-AM')).toThrow('The hour should represent a number');
  });
  it('ZOO ABERTO', () => {
    expect(getOpeningHours('Tuesday', '11:30-AM')).toBe('The zoo is open');
  });
  it('ZOO FECHADO', () => {
    expect(getOpeningHours('Monday', '12:30-PM')).toBe('The zoo is closed');
  });
});
