const { employees, species } = require('../data/zoo_data');

const getOldestFromFirstSpecies = (id) => {
  const firstAnimalByIdEmployee = employees
    .find((employee) => employee.id === id).responsibleFor[0];

  const { residents } = species.find((specie) => specie.id === firstAnimalByIdEmployee);
  const oldestAnimalVerify = residents
    .reduce((acc, curr) => (acc.age > curr.age ? acc : curr));
  return Object.values(oldestAnimalVerify);
};
console.log(getOldestFromFirstSpecies('c1f50212-35a6-4ecd-8223-f835538526c2'));
module.exports = getOldestFromFirstSpecies;
