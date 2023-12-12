const { species } = require('../data/zoo_data');

const getAnimalsOlderThan = (animal, age) => species
  .find((specie) => specie.name === animal).residents
  .every((quality) => quality.age >= age);

console.log(getAnimalsOlderThan('lions', 20));
module.exports = getAnimalsOlderThan;
