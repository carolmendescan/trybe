// Desafio 1
function compareTrue(corAmarela, corVerde) {
  if (corAmarela === true && corVerde === true) {
    return true;
  }
  return false;
}
// console.log(compareTrue(true, true));
// console.log(compareTrue(false, false));

// Desafio 2
function calcArea(base, height) {
  let area = (base * height) / 2;
  return area;
}
// console.log(calcArea(10, 50));
// console.log(calcArea(5, 2));
// console.log(calcArea(51, 1));

// Desafio 3
function splitSentence(frase) {
  let fraseSeparada = frase.split(' ');
  return fraseSeparada;
}
// console.log(splitSentence('go Trybe'));
// console.log(splitSentence('vamo que vamo'));
// console.log(splitSentence('foguete'));

// Desafio 4
function concatName(nome) {
  const primeiroItem = nome[0];
  const ultimoItem = nome[nome.length - 1];

  return `${ultimoItem}, ${primeiroItem}`;
}
// console.log(concatName(['Lucas', 'Cassiano', 'Ferraz', 'Paolillo']));
// console.log(concatName(['foguete', 'não', 'tem', 'ré']));
// console.log(concatName(['captain', 'my', 'captain']));

// Desafio 5
function footballPoints(wins, ties) {
  const vitorias = wins * 3;
  const empates = ties * 1;

  return vitorias + empates;
}
// console.log(footballPoints(14, 8));
// console.log(footballPoints(1, 2));
// console.log(footballPoints(0, 0));

// Desafio 6
function highestCount(numeros) {
  let contador = 0;
  const maiorNumero = Math.max(...numeros);
  for (let index of numeros) {
    if (index === maiorNumero) {
      contador += 1;
    }
  }
  return contador;
}
// console.log(highestCount([9, 1, 2, 3, 9, 5, 7]));
// console.log(highestCount([0, 4, 4, 4, 9, 2, 1]));
// console.log(highestCount([0, 0, 0]));

// Desafio 7
function catAndMouse(mouse, cat1, cat2) {
  let distancia1 = Math.abs(mouse - cat1);
  let distancia2 = Math.abs(mouse - cat2);
  let maisPerto = '';

  if (distancia1 < distancia2) {
    maisPerto = 'cat1';
  } else if (distancia2 < distancia1) {
    maisPerto = 'cat2';
  } else {
    maisPerto = 'os gatos trombam e o rato foge';
  }
  return maisPerto;
}

// console.log(catAndMouse(0, 3, 2));
// console.log(catAndMouse(0, 6, 12));
// console.log(catAndMouse(1, 3, 3));

// Desafio 8
function fizzBuzz(numeros) {
  let array = [];
  for (let n of numeros) {
    if ((n % 3 === 0) && (n % 5 !== 0)) {
      array.push('fizz');
    } else if ((n % 5 === 0) && (n % 3 !== 0)) {
      array.push('buzz');
    } else if ((n % 5 === 0) && (n % 3 === 0)) {
      array.push('fizzBuzz');
    } else {
      array.push('bug!');
    }
  }
  return array;
}

// console.log(fizzBuzz([2, 15, 7, 9, 45]));
// console.log(fizzBuzz([7, 9]));
// console.log(fizzBuzz([9, 25]));

// Desafio 9
function encode(frase) {
  let array = [];

  for (let index in frase) {
    if (frase[index] === 'a') {
      array.push('1');
    } else if (frase[index] === 'e') {
      array.push('2');
    } else if (frase[index] === 'i') {
      array.push('3');
    } else if (frase[index] === 'o') {
      array.push('4');
    } else if (frase[index] === 'u') {
      array.push('5');
    } else {
      array.push(frase[index]);
    }
  }
  return array.join('');
}
// console.log(encode('Hello'));
// console.log(encode('How are you today?'));
// console.log(encode('This is an encoding test.'));
// console.log(encode('go Trybe!'));

function decode(frases) {
  let arrays = [];

  for (let indEx in frases) {
    if (frases[indEx] === '1') {
      arrays.push('a');
    } else if (frases[indEx] === '2') {
      arrays.push('e');
    } else if (frases[indEx] === '3') {
      arrays.push('i');
    } else if (frases[indEx] === '4') {
      arrays.push('o');
    } else if (frases[indEx] === '5') {
      arrays.push('u');
    } else {
      arrays.push(frases[indEx]);
    }
  }
  return arrays.join('');
}

console.log(decode('h3 th2r2!'));

// Desafio 10
function techList(technology, names) {
  let newArray = [];
  technology = technology.sort();
  if (technology.length === 0) {
    return 'Vazio!';
  }
  for (let index = 0; index < technology.length; index += 1) {
    let objeto2 = {
      tech: technology[index],
      name: names,
    };
    newArray.push(objeto2);
  }
  return newArray;
}
console.log(techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'], 'Lucas'));

// .
// .
// .
// .
// CÓDIGO MAIS CLEAN(OPÇÃO1):
// const techList = (technology, name) => (technology ? technology.map(el => ({ tech: el, name})) : 'Vazio!');
// console.log(techList(['React', 'Jest', 'HTML', 'CSS', 'JavaScript'] , 'Lucas'));

// CÓDIGO MAIS CLEAN(OPÇÃO2):
// const techList = (technology, name) => (technology.length ? technology.map(el => ({ tech: el, name})) : `${names} está vazio`);
// console.log(techList([] , 'Lucas'));

module.exports = {
  calcArea,
  catAndMouse,
  compareTrue,
  concatName,
  decode,
  encode,
  fizzBuzz,
  footballPoints,
  highestCount,
  splitSentence,
  techList,
};
