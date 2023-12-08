// Desafio 11
function generatePhoneNumber(numeros) {
  let phoneNumber= '(**) *****-****'
  let repete = 0;

  if (numeros.length !== 11) {
    return 'Array com tamanho incorreto.';
  }
  for (let index in numeros){
    phoneNumber = phoneNumber.replace('*', numeros[index]);
    for (let compare in numeros){
    if (numeros[index] === numeros[compare]){
     repete +=1;
    }
  }
    if (numeros[index] > 9 || numeros[index] < 0 || repete >=3){
     return 'não é possível gerar um número de telefone com esses valores';
  }
  repete = 0;
  }
  return phoneNumber;
}

// console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1]);

// Desafio 12
function triangleCheck(a, b, c) {
  if (a + b > c && a + c > b && b + c > a) {
    return true;
  }
  return false;
}

// Desafio 13
function hydrate(frase) {
  let pegaNumero = /\d+/g;
  let todosOsNumeros = frase.match(pegaNumero);
  let copoAgua = 0;

  for (let index = 0; index < todosOsNumeros.length; index += 1) {
    let numeroDoArray = parseInt(todosOsNumeros[index]);
    if (numeroDoArray >= 1 && numeroDoArray <= 9) {
      copoAgua += numeroDoArray;
    }
  }
  if(copoAgua === 1){
  return `${copoAgua} copo de água`;
  } else {
    return `${copoAgua} copos de água`;
  }
}
// console.log(hydrate('1 cachaça, 5 cervejas e 1 copo de vinho'));

module.exports = {
  generatePhoneNumber,
  hydrate,
  triangleCheck,
};
