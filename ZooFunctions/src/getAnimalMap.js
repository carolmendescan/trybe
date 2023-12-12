const { species } = require('../data/zoo_data');
// ==============================================PARTE 1=========================================
const getLocation = () => species
  .map((specie) => specie.location)
  .reduce((acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]), []);

const getAnimalsByLocation = () => getLocation()
  .reduce((acc, curr) => {
    acc[curr] = species.filter((specie) => specie.location === curr).map((animal) => animal.name);
    return acc;
  }, {});

// =====================================PARTE ================================================

const comparaElementos = (sex, sorted) => {
  const localidades = getLocation();
  const animalByLocation = getAnimalsByLocation();
  localidades.forEach((local) => {
    animalByLocation[local] = animalByLocation[local].map((animal) => {
      let { residents } = species.find((specie) => specie.name === animal);
      if (sex) {
        residents = residents.filter((resident) => resident.sex === sex);
      }
      residents = residents.map((resident) => resident.name);
      if (sorted) {
        residents.sort();
      }
      const obj = {};
      obj[animal] = residents;
      return obj;
    });
  });
  return animalByLocation;
};

const getAnimalMap = (option) => {
  const { includeNames, sex, sorted } = option || {}; // caso o option não for definido passo um obj vazio.
  if (includeNames) {
    return comparaElementos(sex, sorted);
  }
  return getAnimalsByLocation();
};

console.log(getAnimalMap({ includeNames: true, sex: 'female', sorted: true }));
module.exports = getAnimalMap;
// =========================================REQUISITOS================================================
// 1. sem parametros, sem includeNames
// {
//   NE: ['lions', 'giraffes'],
//   NW: ['tigers', 'bears', 'elephants'],
//   SE: ['penguins', 'otters'],
//   SW: ['frogs', 'snakes'],
// }

// 2.- Retorne a espécie e o nome dos animais caso a função receba apenas o parâmetro `{includeNames: true}`;
// NE: [
//   { lions: ['Zena', 'Maxwell', 'Faustino', 'Dee'] },
//   { giraffes: ['Gracia', 'Antone', 'Vicky', 'Clay', 'Arron', 'Bernard'] },
// ],

// 3.- Retorne a espécie e o nome dos animais em ordem alfabética caso a função receba o parâmetro `{includeNames: true, sorted: true}`;
// NE: [
//   { lions: ['Dee', 'Faustino', 'Maxwell', 'Zena'] },
//   { giraffes: ['Antone', 'Arron', 'Bernard', 'Clay', 'Gracia', 'Vicky'] },
// ],

// -4. Retorne a espécie e o nome dos animais filtrado por sexo:
// `{includeNames: true, sex: female}` ou `{includeNames: true, sex: male}`

// NE: [
//   { lions: ['Zena', 'Dee'] },
//   { giraffes: ['Gracia', 'Vicky'] },
// ],

// -5. Retorne a espécie e o nome dos animais filtrado por sexo e por ordem alfabética:
// {includeNames: true, sex: female, sorted: true}
// {includeNames: true, sex: male, sorted: true}

// NE: [
//   { lions: ['Dee', 'Zena'] },
//   { giraffes: ['Gracia', 'Vicky'] },
// ],
