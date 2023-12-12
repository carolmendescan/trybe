const { species } = require('../data/zoo_data');

const countAnimals = (animal) => {
  if (!animal) {
    return species.reduce((acc, cur) => {
      acc[cur.name] = cur.residents.length;
      return acc;
    }, {});
  }
  const animalPeloNome = species.find(({ name }) => name === animal.species);
  const animalByGender = animalPeloNome.residents.filter(({ sex }) => sex === animal.sex);

  if (animal.sex) {
    return animalByGender.length;
  }
  return animalPeloNome.residents.length;
};

console.log(countAnimals({ species: 'bears', sex: 'male' }));

module.exports = countAnimals;
